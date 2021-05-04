const { Organization } = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async (organizationToPersist) => {
  const result = await Organization.create(organizationToPersist);
  return result;
};

const update = async (id, properties) => {
  const result = await Organization.update(id, properties, { deleteMissingProperties: true });
  return result;
};

const getAll = async () => {
  try {
    const result = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address']
    });
    return result;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
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
    res.status(500).json({message: error.message})
  }
};

const destroy = async () => {};

module.exports = {
    persist,
    update,
    getAll,
    getOne,
    destroy
};