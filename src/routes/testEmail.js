var express = require('express');
var router = express.Router();
const errorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/emailSender');
const templateEmail = require('../views/layouts/templateEmail')
const emailsSource = require('../utils/fakeEmailSource');
const infoEmail = require('../utils/infoEmailTemplate')

const emailSource = emailsSource('newReport');

//For testing
router.post('/', async(req, res, next) => {
  try {
    const message = {
      from: emailSource.email,
      to: 'nadiarosenberg96@gmail.com',
      subject: 'Registro existoso',
      template: 'templateEmail',
      context: infoEmail
    };
    sendEmail(emailSource, message);
  } catch (err) {
    console.log(err);
    const friendlyError = errorHandler(err);
    res.status(friendlyError.statusCode).send(friendlyError.message);
  }
});

module.exports = router;