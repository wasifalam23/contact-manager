const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(contactController.getContactsByLoggedInUser)
  .post(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.createContact
  );

router
  .route('/:id')
  .get(contactController.getContactById)
  .patch(
    contactController.uploadContactPhoto,
    contactController.resizeContactPhoto,
    contactController.updateContact
  )
  .delete(contactController.deleteContact);

module.exports = router;
