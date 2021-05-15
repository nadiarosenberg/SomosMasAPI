const { Members } = require('../../models');
const logger = require('../../utils/pinoLogger');

const getAll = async () => {
  try {
    const result = await Members.findAll({
      attributes: ['name', 'image'],
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const persist = async (memberToPersist) => {
  try {
    const result = await Members.create(memberToPersist);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  getAll,
  persist
};
