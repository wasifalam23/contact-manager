const multer = require('multer');

const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/uploads');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    const fileName = `contact-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: multerStorage });

exports.uploadContactPhoto = upload.single('photo');

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
  console.log(req.file);
  console.log(req.body);
  const newContact = await Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    photo: req.file.fileName,
    dateOfBirth: req.body.dateOfBirth,
    occupation: req.body.occupation,
    address: req.body.address,
  });

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

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
