const { Contact } = require('../../models');
const logger = require('../../utils/pinoLogger');

const errorHandler = require("../../utils/errorHandler");
const sendEmail = require("../../utils/emailSender");
const emailsSource = require("../../utils/fakeEmailSource");
const userData = require("../../utils/fakeData");
const emailSource = emailsSource("newContact");


const persist = async (contactToPersist) => {
  try {
    const result = await Contact.create(contactToPersist);
	 const message = {
    from: emailSource.email,
    to: userData.email,
    subject: "Your new report was created successfully",
    text: `${userData.firstName} your new report called ${result.name} was created without a problem.`,
  };
  
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getAll = async () => {
  try {
    const result = await Contact.findAll({});
    return result;
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = {
  persist,
  getAll
}