const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: {
      contacts,
    },
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) next(new AppError('No contact found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      contact: newContact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!contact) next(new AppError('No contact found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});
