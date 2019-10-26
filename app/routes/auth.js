const router = require('express').Router();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const geoip = require('geoip-lite');
const geocoder = require('node-open-geocoder');
const publicIp = require('public-ip');
const User = require('../models/UserModel');
const mailer = require('../utils/mailer');
const { accessLifetime, refreshLifetime, secret } = require('../config');

router.post('/check-if-unique', checkIfUnqiue);
router.post('/register', register);
router.post('/activate-account', activateAccount);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/refresh-tokens', refreshTokens);

module.exports = router;

function checkIfUnqiue(req, res) {

  let find;
  const { login, email } = req.body;

  if (login) find = User.checkIfLoginUnique(login);
  else if (email) find = User.checkIfEmailUnique(email);

  if (find) {
    find
    .then(unique => res.json({ unique: unique }))
    .catch(e => res.status(500).send())
  }
  else
    res.status(400).json({ reason: 'No login or email to validate!'});
}


 async function register(req, res) {

  let login, name, surname, email, password, token;

  let location = req.body.location ? await getUserLocation(req.body.location) :
                                                        await getIpLocation(req.connection.remoteAddress);

  if(!(login = validateLogin(req.body.login)))
    return res.status(400).send({ reason: 'Invalid login!' });

  if (!(name = validateName(req.body.name)))
    return res.status(400).send({ reason: 'Invalid name!' });

  if (!(surname = validateName(req.body.surname)))
    return res.status(400).send({ reason: 'Invalid surname!' });

  if(!(email = validateEmail(req.body.email)))
    return res.status(400).send({ reason: 'Invalid email!' });

  if(!(password = validatePassword(req.body.password, req.body.confirmPassword)))
    return res.status(400).send({ reason: 'Invalid password or passwords do not match!' });

  token = uuid();
  hashPassword(password)
  .then(password => registerUser(login, name, surname, email, password, token, location))
  .then(() => mailer.sendActivationMessage(login, email, token))
  .then(() => res.send())
  .catch(() => res.status(500).send());
}

const getUserLocation = async coords => new Promise((resolve) => {
  geocoder()
    .reverse(coords.longitude, coords.latitude)
    .end((err, res) => {
      if (err) return resolve(null);
      resolve({ country: res.address.country, city: res.address.city, coords: [res.lat, res.lon] })
    })
});



const getIpLocation = async ip => {

  let location = geoip.lookup(ip === '::ffff:127.0.0.1' ? await publicIp.v4() : ip);
  let { country, city, ll } = location;
  return { country: country, city: city, coords: ll };
};

const validateLogin = login => (login && /^[a-z0-9]{3,20}$/i.test(login)) ? capitalize(login) : null;

const validateName = name => (name && /^[a-z]{2,20}$/i.test(name)) ? capitalize(name) : null;

const validateEmail = email => email ? email.toLowerCase() : null;

const validatePassword = (password, passwordConfirm) => (password && password === passwordConfirm &&
  /((?=.*[a-z])(?=.*[0-9])(?=.{6,}))/i.test(password)) ? passwordConfirm : null;

const capitalize = str => str.charAt(0).toUpperCase() +  str.slice(1).toLowerCase();

const registerUser = (login, name, surname, email, password, token, location) => new Promise((resolve, reject) => {
  let user = new User({ login, name, surname, email, password, token, location });
  user.save()
  .then(() => resolve())
  .catch(e => console.log(e))
});

const hashPassword = password => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return reject(err);
    resolve(hash);
  })
});

function activateAccount(req, res) {

  let { login, token } = req.body;

  User.findByLogin(login)
  .then(user => {
    if (!user)
      return res.status(400).json({ reason: 'Invalid link!' });
    if (user.activated)
      return res.status(400).json({ reason: 'Your account is already activated!' });
    if (user.token !== token)
      return res.status(400).json({ reason: 'Invalid link!' });
    user.token = '';
    user.activated = true;
    user.save()
    .then(() => res.send())
    .catch(() => res.status(500).send());
  })
  .catch(() => res.status(500).send());
}

function login(req, res) {

  let { login, password } = req.body;

  User.findByLogin(login)
  .then(user => {

    if (!user) return res.status(401).json({ reason: 'Invalid login or password!' });
    if (!user.activated) return res.status(401).json({ reason: 'You need to activate account first!' });

    bcrypt.compare(password, user.password, (err, match) => {

      if (err) return res.status(500).send();
      if (!match) return  res.status(401).json({ reason: 'Invalid login or password!' });

      createTokens(user)
      .then(tokens => res.json(tokens))
      .catch(() => res.status(500).send());
    })
  })
  .catch(() => res.status(500).send());
}

const createTokens = user => new Promise((resolve, reject) => {

  let tokens = {};

  tokens.accessToken = 'Bearer ' + jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + accessLifetime }, secret);
  tokens.refreshToken = 'Bearer ' + jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + refreshLifetime }, secret);
  user.token = tokens.refreshToken;

  user.save()
  .then(() => resolve(tokens))
  .catch(() => reject());
});

function resetPassword(req, res) {

  let { login, email } = req.body;

  User.findByLogin(login)
  .then(user => {
    if (!user || user.email !== email)
      return res.status(401).json({ reason: 'Invalid login or email!' });

    let password = generator.generate({ length: 6, numbers: true });
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).send();
      user.password = hash;
      user.save()
      .then(() => {
        res.send();
        mailer.sendNewPassword(login, email, password);
      })
      .catch(() => res.status(500).send());
    })
  })
  .catch(() => res.status(500).send());
}

function refreshTokens(req, res) {

  let token;

  if (!(token = req.body.refreshToken.split(' ')[1]))
    return res.status(401).json({ reason: 'Invalid token' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ reason: 'Invalid token'});

    User.findOne({_id: decoded.id}).exec()
    .then(user => {
      if (!user || user.token.split(' ')[1] !== token)
        return res.status(401).json({ reason: 'Invalid token'});

      createTokens(user)
      .then(tokens => res.json(tokens))
      .catch(() => res.status(500).send());
    })
    .catch(() => res.status(500).send());
  })
}
