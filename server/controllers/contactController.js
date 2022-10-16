const multer = require('multer');
const sharp = require('sharp');

const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const checkPermission = async (loggedInUserId, contactId, next) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  const creatorId = contact.creator.id;
  const permissionIsGranted =
    loggedInUserId === creatorId ? contactId : undefined;

  return permissionIsGranted;
};

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

exports.getContactByLoggedInUser = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const contacts = await Contact.find({ creator: currentUser });

  if (!contacts) next(new AppError('No contact found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      contacts,
    },
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const imgFile = req.file ? req.file.filename : undefined;
  const creator = req.user.id;

  const newContact = await Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    photo: imgFile,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    creator,
  });

  res.status(201).json({
    status: 'success',
    data: {
      contact: newContact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contactId = await checkPermission(req.user.id, req.params.id, next);

  if (!contactId) {
    return next(
      new AppError('You do not have permission to perform this action', 401)
    );
  }

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

  const contact = await Contact.findByIdAndUpdate(contactId, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contactId = await checkPermission(req.user.id, req.params.id, next);

  if (!contactId) {
    return next(
      new AppError('You do not have permission to perform this action', 401)
    );
  }

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
