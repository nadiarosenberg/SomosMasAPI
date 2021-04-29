const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const payload = {
    email: 'alkemyprueba@gmail.com',
    pass: '123123123asdasd'
}

const transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: payload.email,
        pass: payload.pass
    }
}));


const sendEmailTo = (message, data) => {
    return transport.sendMail(message, (err, info) => {
        if (err) {
          console.log(err)
          
        } else {
          console.log(info);
        }
    });
}

module.exports = sendEmailTo;
