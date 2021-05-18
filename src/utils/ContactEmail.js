const emailsSource = require("./fakeEmailSource");
const sendEmail = require("./emailSender");
const emailSource = emailsSource("contacts");

const Contact_Email = (userEmail, userName, surName) => {
  const message = {
    from: emailSource.email,
    to: userEmail,
	subject: "Registro Contacto existoso",
	text:"Gracias por contactarnos. Registro Exitoso"
    };
  sendEmail(emailSource, message);
  console.log(message);
};

module.exports = Contact_Email;
