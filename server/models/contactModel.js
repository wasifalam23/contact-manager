const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema(
  {
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
      trim: true,
      required: [true, 'A contact must have a phone'],
      unique: true,
      minLength: [10, 'Phone field must be with a min. length of 10'],
      maxLength: [13, 'Phone field must be with a max. length of 13'],
    },

    email: {
      type: String,
      trim: true,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please Provide a valid email'],
    },

    photo: {
      type: String,
      default: 'default.jpg',
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
      maxLength: [25, 'Address field must be with a max. length of 25'],
      default: 'Not Available',
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Contact must belong to an user'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

contactSchema.pre(/^find/, function (next) {
  this.populate('creator');

  next();
});

contactSchema.virtual('age').get(function () {
  const currentYear = new Date(Date.now()).getFullYear();
  const birthYear = this.dateOfBirth && this.dateOfBirth.getFullYear();
  return currentYear - birthYear;
});

contactSchema.pre('save', function (next) {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  this.firstName = capitalizeFirstLetter(this.firstName);
  this.lastName = capitalizeFirstLetter(this.lastName);

  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
