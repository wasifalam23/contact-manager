const multer = require('multer');
const sharp = require('sharp');

const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/contacts');
//   },

//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];

//     const fileName = `contact-${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}.${ext}`;

//     cb(null, fileName);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadContactPhoto = upload.single('photo');

exports.resizeContactPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `contact-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`images/contacts/${req.file.filename}`);

  next();
});

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
  const imgFile = req.file ? req.file.filename : undefined;

  const newContact = await Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    photo: imgFile,
    dateOfBirth: req.body.dateOfBirth,
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
  const imgFile = req.file ? req.file.filename : undefined;
  const update = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    photo: imgFile,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
  };

  const contact = await Contact.findByIdAndUpdate(req.params.id, update, {
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
