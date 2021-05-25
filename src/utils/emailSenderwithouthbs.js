const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const hbs = require('nodemailer-express-handlebars');

const emailSender = (emailAccount, data) => {
  const sendEmailTo = message => {
    return transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  };
  const transport = nodemailer.createTransport(
    smtpTransport({
      service: emailAccount.service,
      auth: {
        user: emailAccount.email,
        pass: emailAccount.password,
      },
    })
  );
  /*
    transport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: './src/views/layouts/',
            defaultLayout: 'templateEmail',
            partialsDir: './src/views/',
        },
        viewPath: './src/views/layouts/',
        extName: '.hbs'
    }));
*/
  const message = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    template: data.template,
    context: data.context,
  };

  sendEmailTo(message);
};

module.exports = emailSender;
