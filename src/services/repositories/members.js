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

module.exports = {
  getAll,
};
