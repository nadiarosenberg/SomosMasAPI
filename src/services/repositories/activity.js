const {Activities} = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async activityToPersist => {
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
};

const getOne = async id => {
  try {
    const result = await Activities.findOne({
      where: {id},
    });

    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (id, properties) => {
  try {
    const result = await Activities.update(properties, {
      where: {id},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const destroy = async id => {
  try {
    const result = await Activities.destroy({
      where: {id},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const restore = async id => {
  try {
    const result = await Activities.restore({
      where: {id},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  persist,
  getAll,
  getOne,
  update,
  destroy,
  restore,
};
