const {Role} = require('../../models/index');
const logger = require('../../utils/pinoLogger');

const persist = async role => {
  try {
    const result = await Role.create(role);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getAll = async () => {
  try {
    const result = await Role.findAll({
      attributes: ['name', 'description'],
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getOne = async id => {
  try {
    const result = await Role.findOne({
      where: {
        id,
      },
      attributes: ['name', 'description'],
    });

    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (id, properties) => {
  try {
    const result = await Role.update(properties, {
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const destroy = async id => {
  try {
    const result = await Role.destroy({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const restore = async id => {
  try {
    const result = await Role.restore({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  persist,
  update,
  getAll,
  getOne,
  destroy,
  restore,
};
