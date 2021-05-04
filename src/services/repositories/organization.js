const { Organization } = require('../../models');

const persist = async (organizationToPersist) => {
  const result = await Organization.create(organizationToPersist);
  return result;
};

const update = async (organizationId, propertiesToUpdate) => {
  const result = await Organization.update(organizationId, properties, { deleteMissingProperties: true });
  return result;
};

const getAll = async () => {};

const getOne = async () => {};

const destroy = async () => {};

module.exports = {
    persist,
    update,
    getAll,
    getOne,
    destroy
};