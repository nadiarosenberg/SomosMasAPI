const repository = require('./../services/repositories/organization');


const createOrganization = async (organization) => {
  const createdOrganization = await repository.persist(organization);
  return createdOrganization;
};

const getAllOrganizations = async () => {
  const organizations = repository.getAll();
  return organizations;
}

const getOrganizationById = async (organizationId) => {
  const organization = repository.get(organizationId);
  return organization;
}

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById
};