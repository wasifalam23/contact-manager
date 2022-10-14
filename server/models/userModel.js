const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: 'String',
    trim: true,
    required: [true, 'Please tell us your name'],
    maxlength: [8, 'User name should not exceed 8 characters'],
  },

  email: {
    type: 'String',
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  password: {
    type: 'String',
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password should contain atleast 8 characters'],
    select: false,
  },

  passwordConfirm: {
    type: 'String',
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

UserSchema.pre('save', function (next) {
  this.name =
    this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();

  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

UserSchema.methods.checkPassword = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
