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
    attachments: [{
      filename: 'LOGO-SOMOS-MAS.png',
      path: './src/views/layouts/images/LOGO-SOMOS-MAS.png',
      cid: 'LOGO-SOMOS-MAS'
    }],
  };
  sendEmail(emailSource, message);
};

module.exports = welcomEmail;
