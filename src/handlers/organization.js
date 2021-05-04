const repository = require('./../services/repositories/organization');

const createOrganization = async (organization) => {
  const createdOrganization = await repository.persist(organization);
  return createdOrganization;
};

const getAllOrganizations = async () => {
  const organizations = await repository.getAll();
  return organizations;
};

const getOrganizationById = async (id) => {
  const organization = await repository.getOne(id);
  return organization;
};

const updateOrganization = async (id,properties) => {
  const organization = await repository.update(id, properties);
  return organization;
};

const deleteOrganization = async (id) => {
  const organization = await repository.destroy(id);
  return organization;
};

const retoreOrganization = async (id) => {
  const organization = await repository.restore(id);
  return organization;
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  retoreOrganization
};