const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A contact must have a first name'],
  },

  lastName: {
    type: String,
    required: [true, 'A contact must have a last name'],
  },

  phone: {
    type: String,
    required: [true, 'A contact must have a phone'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'A contact must have an email'],
    unique: true,
    validate: validator.isEmail,
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
