var express = require('express');
var router = express.Router();
const errorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/emailSender');
const userData = require('../utils/fakeData');
const templateEmail = require('../views/layouts/templateEmail')
const emailsSource = require('../utils/fakeEmailSource');

const emailSource = emailsSource('newReport');

const templateContext = {
  title: 'Bienvenida/o a Somos Más',
  text: 'Hola! Usted se ha registrado correctamente.',
  contact: '0387 582-7282 / info@fundacionsomosmas.com.ar',
  url: 'https://scontent.fpra1-1.fna.fbcdn.net/v/t1.18169-9/1452262_1538356629723251_1745439727_n.png?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=b9bX72nxBsYAX9tyuhd&_nc_ht=scontent.fpra1-1.fna&oh=aaea0c2020910da448949253af6aa0b5&oe=60BA5FB3',
};

//For testing
router.post('/', async(req, res, next) => {
  try {
    const message = {
      from: emailSource.email,
      to: 'nadiarosenberg96@gmail.com',
      subject: 'Registro existoso',
      template: 'templateEmail',
      context: templateContext,
    };
    sendEmail(emailSource, message);
  } catch (err) {
    console.log(err);
    const friendlyError = errorHandler(err);
    res.status(friendlyError.statusCode).send(friendlyError.message);
  }
});

module.exports = router;