const repository = require('../services/repositories/roles');

const createRole = async role => {
  const createdRole = await repository.persist(role);
  return createdRole;
};

const getAllRoles = async () => {
  const roles = await repository.getAll();
  return roles;
};

const getRoleById = async id => {
  const role = await repository.getOne(id);
  return role;
};

const updateRole = async (id, properties) => {
  const role = await repository.update(id, properties);
  return role;
};

const deleteRole = async id => {
  const role = await repository.destroy(id);
  return role;
};

const retoreRole = async id => {
  const role = await repository.restore(id);
  return role;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  retoreRole,
};
