const repository = require('../services/repositories/organization');
const socialMedia = require('../services/repositories/socialmedia');

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


const getOneSocialMedia = async (id) => {
  const socialmedia = await socialMedia.getOne(id);
  return socialmedia;
}

const postSocialMedia = async (newSocialMedia) => {
  const socialmedia = await socialMedia.create(newSocialMedia);
  return socialmedia;
}

const putSocialMedia = async (editedSocialMedia, id) => {
  const socialmedia = await socialMedia.update(editedSocialMedia, id);
  return socialmedia;
}

const deleteSocialMedia = async (id) => {
  const socialmedia = await socialMedia.deleteOne(id);
  return socialmedia;
}

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  retoreOrganization,
  getOneSocialMedia,
  postSocialMedia,
  putSocialMedia,
  deleteSocialMedia
};