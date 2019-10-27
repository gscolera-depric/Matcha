const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  login: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  surname: { type:	String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String},
  activated: {type: Boolean, default: false},
  fameRating: { type: Number, default: 0 },
  album: Array,
  location: {
    country: String,
    city: String,
    coords: Array
  },
  tags: Array,
  gender: String,
  sexualPreferences: { type: String, default: 'Bisexual'},
  biography: String
});

userSchema.statics.findByLogin = function(login) {
  return this.findOne({ login: new RegExp(`^${login}$`, 'i') }).exec();
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: new RegExp(`^${email}$`, 'i') }).exec();
};

userSchema.statics.checkIfLoginUnique = function(login) {
  return new Promise((resolve, reject) => {
    this.findByLogin(login)
    .then(user => user ? resolve(false) : resolve(true))
    .catch(e => reject('Database error'))
  })
};

userSchema.statics.checkIfEmailUnique = function(email) {
  return new Promise((resolve, reject) => {
    this.findByEmail(email)
    .then(user => user ? resolve(false) : resolve(true))
    .catch(e => reject('Database error'))
  })
};

module.exports = User = mongoose.model('User', userSchema);