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

module.exports = {
  persist
}