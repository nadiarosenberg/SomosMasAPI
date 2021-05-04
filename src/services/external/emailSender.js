const libraryToSendEmails = require('libraryToSendEmails');

const defaultFirm = levantarImagenDelFilesystem();

const sendEmailTo = (subject, destinatary, content, firm = defaultFirm) => {
    libraryToSendEmails.sendEmail(subject, destinatary, process.env.DEFAULT_EMAIL, content, firm);
};

module.exports = {
    sendEmailTo
};