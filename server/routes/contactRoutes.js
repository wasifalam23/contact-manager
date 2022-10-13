const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(contactController.getAllContacts)
  .post(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.createContact
  );

router
  .route('/:id')
  .get(contactController.getContact)
  .patch(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.updateContact
  )
  .delete(contactController.deleteContact);

module.exports = router;
