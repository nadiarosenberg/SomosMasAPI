const { Organization } = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async (organizationToPersist) => {
  const result = await Organization.create(organizationToPersist);
  return result;
};

const update = async (organizationId, propertiesToUpdate) => {
  const result = await Organization.update(organizationId, properties, { deleteMissingProperties: true });
  return result;
};

const getAll = async () => {
  try {
    let result = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address']
    });
    return result;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getOne = async () => {};

const destroy = async () => {};

module.exports = {
    persist,
    update,
    getAll,
    getOne,
    destroy
};