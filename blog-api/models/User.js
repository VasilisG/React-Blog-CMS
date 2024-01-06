const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpire: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Signs a JWT token upon user registration / login.
 * @returns string
 */
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + parseInt(process.env.JWT_EXPIRE)
  });
}

/**
 * Checks if user's password matches with the password in the database.
 * @param {string} enteredPassword User's login password
 * @returns 
 */
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);