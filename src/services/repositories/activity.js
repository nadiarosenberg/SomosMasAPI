const { Activities } = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async (activityToPersist) => {
  try {
    const result = await Activities.create(activityToPersist);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getAll = async () => {
  try {
    const result = await Activities.findAll({});
    return result;
  } catch (error) {
    logger.error(error.message);
  }
}

const getOne = async (id) => {
  try {
    const result = await Activities.fondOne({
      where: { id }
    });

    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  persist,
  getAll,
  getOne
}