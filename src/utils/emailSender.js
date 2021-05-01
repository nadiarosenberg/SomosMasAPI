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
// // requierd
// const emailsSource = require('../utils/fakeEmailSource');
// // var
// const emailSource = emailsSource('newReport');
// // message
// const message = {
//     from: emailSource.email, 
//     to: userData.email,
//     subject: 'Your new report was created successfully',
//     text: `${userData.firstName} your new report called ${data.name} was created without a problem.`
//   };
// // how to send function
//   sendEmail(emailSource, message);

module.exports = emailSender;
