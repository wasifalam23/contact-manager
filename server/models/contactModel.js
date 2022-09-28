const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'A contact must have a first name'],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, 'A contact must have a last name'],
  },

  phone: {
    type: String,
    required: [true, 'A contact must have a phone'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email'],
  },

  photo: {
    type: String,
    default: 'default.png',
  },

  dateOfBirth: {
    type: Date,
  },

  address: {
    type: String,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
