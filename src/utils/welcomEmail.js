const emailsSource = require('./fakeEmailSource');
const infoEmail = require('./infoEmailTemplate')
const sendEmail = require('./emailSender');
const { firstName } = require('./fakeData');
const emailSource = emailsSource('newReport');

function welcomEmail(userEmail, userName) { 
    const message = {
      from: emailSource.email,
      to: userEmail,
      subject: 'Registro existoso',
      template: 'templateEmail',
      context: infoEmail(userName)
    };
    sendEmail(emailSource, message);
    console.log(message);
  }

module.exports = welcomEmail;