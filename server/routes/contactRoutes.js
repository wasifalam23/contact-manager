const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(contactController.getContactByLoggedInUser)
  .post(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.createContact
  );

router
  .route('/:id')
  .patch(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.updateContact
  )
  .delete(contactController.deleteContact);

module.exports = router;
