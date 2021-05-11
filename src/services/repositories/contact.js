const { Contact } = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async (contactToPersist) => {
  try {
    const result = await Contact.create(contactToPersist);
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