const emailsSource = require('./fakeEmailSource');
const infoEmail = require('./infoEmailTemplate');
const sendEmail = require('./emailSender');
const emailSource = emailsSource('newReport');

const welcomEmail = (userEmail, userName, surName) => {
  const message = {
    from: emailSource.email,
    to: userEmail,
    subject: 'Registro existoso',
    template: 'templateEmail',
    context: infoEmail(userName, surName),
  };
  sendEmail(emailSource, message);
  console.log(message);
};

module.exports = welcomEmail;
