const router = require('express').Router();
const User = require('../../models/UserModel');

router.post('/apply-user', applyUser);

module.exports = router;

function applyUser(req, res) {

  User.findOne({ _id: req.headers.uid }).lean().exec()
    .then(user => {
      delete user.__v;
      delete user.activated;
      delete user.password;
      delete user.token;
      res.json(user);
    })
    .catch(() => res.status(500).send());
}