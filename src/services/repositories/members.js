const { Members } = require('../../models');
const logger = require('../../utils/pinoLogger');

const getAll = async (fromMember, limit) => {
  try {
    const result = await Members.findAndCountAll({
      offset: fromMember,
      limit,
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

const destroyMember = async (id) => {
  try {
    const result = await Members.destroy({
      where: { id }
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};
module.exports = {
  getAll,
  persist,
  destroyMember
};
