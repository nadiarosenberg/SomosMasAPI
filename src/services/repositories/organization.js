const { Organization } = require('../../models');
const logger = require('../../utils/pinoLoggerEndpoints');

const persist = async (organizationToPersist) => {
  try {
    const result = await Organization.create(organizationToPersist);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getAll = async () => {
  try {
    const result = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address']
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getOne = async (id) => {
  try {
    const result = await Organization.findOne({
      where: { id },
      attributes: ['name', 'image', 'phone', 'address']
    });

    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (id, properties) => {
  try {
    const result = await Organization.update(properties, { 
      where: { id } 
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const destroy = async (id) => {
  try {
    const result = await Organization.destroy({
      where: { id }
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const restore = async (id) => {
  try {
    const result = await Organization.restore({
      where: { id }
    })
    return result;
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = {
    persist,
    update,
    getAll,
    getOne,
    destroy,
    restore
};