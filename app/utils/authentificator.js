const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const authentificator = (req, res, next) => {

  let token = req.headers.authorization.split(' ')[1];

  if (!token)
    return res.status(401).send();

  try {
    let decoded = jwt.verify(token, secret);
    req.headers.uid = decoded.id;
    next();
  } catch (e) {
    let reason = e.name === 'TokenExpiredError' ? 'token expired' : 'unknown error';
    res.status(401).json({ reason: reason });
  }
};

module.exports = authentificator;