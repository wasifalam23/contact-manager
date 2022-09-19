const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A contact must have a name'],
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
  },

  dateOfBirth: {
    type: Date,
  },

  occupation: {
    type: String,
  },

  address: {
    type: String,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
