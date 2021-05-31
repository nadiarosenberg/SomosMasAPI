const {Organization} = require('../../models');

const persist = async organizationToCreate => await Organization.create(organizationToCreate);

const getAll = async () => {
  const result = await Organization.findAll({
    attributes: ['name', 'image', 'phone', 'address', 'id'],
  });
  return result;
};

const getOne = async orgId => {
  const result = await Organization.findOne({
    where: {id: orgId},
    attributes: ['name', 'image', 'phone', 'address'],
  });
  return result;
};

const update = async (orgId, properties) => {
  const result = await Organization.update(properties, {
    where: {id: orgId},
  });
  return result;
};

const destroy = async orgId => {
  const result = await Organization.destroy({
    where: {id: orgId},
  });
  return result;
};

module.exports = {
  persist,
  getAll,
  getOne,
  update,
  destroy
};
