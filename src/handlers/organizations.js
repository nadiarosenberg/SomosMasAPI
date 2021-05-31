const repositoryOrganizations = require('../services/repositories/organization');
const repositorySocialMedia = require('../services/repositories/socialmedia');
const repositorySlides = require('../services/repositories/slides');

const createOrganization = async (organizationToCreate) => await repositoryOrganizations.persist(organizationToCreate);

const getAllOrganizations = async () => await repositoryOrganizations.getAll();

const getOrganization = async orgId => await repositoryOrganizations.getOne(orgId);

const updateOrganization = async (orgId, properties) => await repositoryOrganizations.update(orgId, properties);

const deleteOrganization = async orgId => await repositoryOrganizations.destroy(orgId);

const getSocialMedia = async orgId => await repositorySocialMedia.getOne(orgId);

const createSocialMedia = async (socialmedia) => await repositorySocialMedia.persist(socialmedia);

const updateSocialMedia = async (socialmedia, orgId) => await repositorySocialMedia.update(socialmedia, orgId);

const createSlide = async slide => await repositorySlides.persist(slide);

const updateSlide = async (orgId, slideId, slide) => await repositorySlides.update(orgId, slideId, slide);

const deleteSlide = async (orgId, slideId) => await repositorySlides.destroy(orgId, slideId);

const getSlide = async (orgId, slideId) => await repositorySlides.getOne(orgId, slideId);

const getAllSlides = async orgId => await repositorySlides.getAll(orgId);

const getSlidesByOrgId = async orgId => await repositorySlides.getSlidesByOrgId(orgId);

const getLastOrder = async orgId => await repositorySlides.lastOrder(orgId);

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  createSocialMedia,
  getSocialMedia,
  updateSocialMedia,
  createSlide,
  getAllSlides,
  getSlide,
  updateSlide,
  deleteSlide,
  getSlidesByOrgId,
  getLastOrder
};
