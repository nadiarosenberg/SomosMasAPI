const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



const emailSender = (emailAccount, data) => {

    const sendEmailTo = (message) => {
        return transport.sendMail(message, (err, info) => {
            if (err) {
              console.log(err)
              
            } else {
              console.log(info);
            }
        });
    }
        const transport = nodemailer.createTransport(smtpTransport({
            service: emailAccount.service,
            auth: {
                user: emailAccount.email,
                pass: emailAccount.password
            }
        }));

        const message = {
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text
        }

        sendEmailTo(message); 

}

module.exports = emailSender;
