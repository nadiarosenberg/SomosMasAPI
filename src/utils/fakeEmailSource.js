const emails = {
  newReport: {
    SOURCE_SERVICE_NOTIFICATION: 'gmail',
    SOURCE_MAIL_NOTIFICATION: 'alkemyprueba@gmail.com',
    SOURCE_PASSWORD_MAIL_NOTIFICATION: '123123123asdasd',
  },
  users: {
    SOURCE_SERVICE_NOTIFICATION: 'gmail',
    SOURCE_MAIL_NOTIFICATION: 'alkemyprueba@gmail.com',
    SOURCE_PASSWORD_MAIL_NOTIFICATION: '123123123asdasd',
  },
  contacts: {
    SOURCE_SERVICE_NOTIFICATION: 'gmail',
    SOURCE_MAIL_NOTIFICATION: 'alkemyprueba@gmail.com',
    SOURCE_PASSWORD_MAIL_NOTIFICATION: '123123123asdasd',
  },
  default: {
    SOURCE_SERVICE_NOTIFICATION: 'gmail',
    SOURCE_MAIL_NOTIFICATION: 'alkemyprueba@gmail.com',
    SOURCE_PASSWORD_MAIL_NOTIFICATION: '123123123asdasd',
  },
};

const email = endpointService => {
  return emails[endpointService]
    ? {
        service: emails[endpointService].SOURCE_SERVICE_NOTIFICATION,
        email: emails[endpointService].SOURCE_MAIL_NOTIFICATION,
        password: emails[endpointService].SOURCE_PASSWORD_MAIL_NOTIFICATION,
      }
    : {
        service: emails['default'].SOURCE_SERVICE_NOTIFICATION,
        email: emails['default'].SOURCE_MAIL_NOTIFICATION,
        password: emails['default'].SOURCE_PASSWORD_MAIL_NOTIFICATION,
      };
};

module.exports = email;
