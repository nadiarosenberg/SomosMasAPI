const Router = require('express').Router();
const handler = require('../handlers/organizations');
const logger = require('../utils/pinoLogger');
const allowAdmins = require('./middlewares/auth');
const {orgValidationRules,
      orgValidationPutRules,
      slidesValidationRules,
      validate} = require('./middlewares/organizations');
const organizationExists = require('./middlewares/organizationExists');
const awsImage = require('../handlers/middlewares/uploadImage');

const wasUpdated = (result, req, res) => result[0] === 1;

Router.post('/', allowAdmins, orgValidationRules(), validate, async (req, res, next) => {
  try {
    const organizationToCreate = req.body;
    const imageBase64 = organizationToCreate.image;
    const imageAwsLink = await awsImage.uploadBase64Image(imageBase64);
    organizationToCreate.image = imageAwsLink;
    const socialmedia = {
      facebook: organizationToCreate.facebook,
      instagram: organizationToCreate.instagram,
      linkedin: organizationToCreate.linkedin,
    };
    if(!Object.values(socialmedia).some(a => !!a)){
      const result = await handler.createOrganization(organizationToCreate);
      logger.info('Organization created successfully');
      res.status(200).json({message: 'Organization created successfully', result});
    }else{
      const result = await handler.createOrganization(organizationToCreate);
      socialmedia.organizationId = result.id;
      const socialMedia = await handler.createSocialMedia(socialmedia);
      res.status(200).json({message: 'Organization created successfully', result, socialMedia});
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

Router.get('/', allowAdmins, async (req, res, next) => {
  try {
    const results = await handler.getAllOrganizations();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

Router.get('/:orgId', async (req, res, next) => {
  try {
    const {orgId} = req.params;
    const organization = await handler.getOrganization(orgId);
    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({message: 'Organization not found'});
    }else{
      const slides = await handler.getSlidesByOrgId(orgId);
      const socialMedia = await handler.getSocialMedia(orgId);
      res.status(200).json({organization, slides, socialMedia})
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

Router.put('/:orgId', allowAdmins, organizationExists, orgValidationPutRules(), validate, async (req, res, next) => {
  try {
    const {orgId} = req.params;
    const updateValues = req.body;
    const socialmedia = {
      facebook: updateValues.facebook,
      instagram: updateValues.instagram,
      linkedin: updateValues.linkedin,
    };
    if(updateValues.image){
      const imageBase64 = updateValues.image;
      const imageAwsLink = await awsImage.uploadBase64Image(imageBase64);
      updateValues.image = imageAwsLink;
    }
    if(!Object.values(socialmedia).some(a => !!a)){
      const result = await handler.updateOrganization(orgId, updateValues);
      if (wasUpdated(result)) {
        res.status(200).json({message: 'Organization updated successfully'});
      } else{
        logger.warn('Error updating organization');
        res.status(400).json({message: 'Error updating organization'});
      }
    }else{
      const socialMedia = await handler.getSocialMedia(orgId);
      if(socialMedia){
        const socialMedia = await handler.updateSocialMedia(socialmedia, orgId);
        const result = await handler.updateOrganization(orgId, updateValues);
        if (wasUpdated(result) || wasUpdated(socialMedia)) {
          res.status(200).json({message: 'Organization updated successfully'});
        } else {
          res.status(400).json({message: 'Error updating organization'});
        }
      }else{
        const result = await handler.updateOrganization(orgId, updateValues);
        socialmedia.organizationId = orgId;
        const socialMedia = await handler.createSocialMedia(socialmedia);
        res.status(200).json({message: 'Organization updated successfully'});
      }
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

Router.delete('/:orgId', allowAdmins, organizationExists, async (req, res, next) => {
  try {
    const {orgId} = req.params;
    const orgDeleted = await handler.deleteOrganization(orgId);
    logger.info('Organization deleted successfully');
    res.status(200).json({message: 'Organization deleted successfully'});
    } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

Router.post('/:orgId/slides', organizationExists, slidesValidationRules(), validate, allowAdmins, async (req, res, next) => {
  try {
    const {orgId} = req.params;
    const slide = req.body;
    slide.organizationId = orgId;
    const image = req.body.imageUrl;
    const imageAwsLink = await awsImage.uploadBase64Image(image);
    slide.imageUrl = imageAwsLink;
    if (!slide.order) {
      const lastOrder = await handler.getLastOrder(orgId);
      slide.order = lastOrder + 1;
    }
    const result = await handler.createSlide(slide);
    res.status(200).json(result);
  } catch (err) {
    logger.error(error.message);
    res.send('Error posting slide');
  }
});

Router.get('/:orgId/slides', allowAdmins, organizationExists, async (req, res, next) => {
  try {
    const {orgId} = req.params;
    const result = await handler.getAllSlides(orgId);
    if (result == 0) {
      res.status(404).json('There are no slides associated with this organization');
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    logger.error(error.message);
    res.send('Error getting slides');
  }
});

Router.get('/:orgId/slides/:slideId', allowAdmins, organizationExists, async (req, res, next) => {
  try {
    const slide = await handler.getSlide(orgId, slideId);
    if (slide) {
      res.json(slide);
    } else {
      res.status(404).json('Slide does not exist');
    }
  } catch (err) {
    logger.error(error.message);
    res.send('Error getting slide');
  }
});

Router.put('/:orgId/slides/:slideId', organizationExists, slidesValidationRules(), validate, allowAdmins, async (req, res, next) => {
  try {
    const {orgId, slideId} = req.params;
    const data = req.body;
    const slide = await handler.getSlide(orgId, slideId);
    if (!slide) {
      res.status(404).json('Slide not found');
    } else {
      if(data.imageUrl){
        const imageBase64 = data.imageUrl;
        const imageAwsLink = await awsImage.uploadBase64Image(imageBase64);
        data.imageUrl = imageAwsLink;
      }
      const slideUpdated = await handler.updateSlide(orgId, slideId, data);
      if (wasUpdated(slideUpdated)) {
        res.status(200).json('Slide updated successfully');
      } else {
        res.status(400).json('Error updating slide');
      }
    }
  } catch (err) {
    logger.error(error.message);
    res.send('Error updating slide');
  }
});

Router.delete('/:orgId/slides/:slideId', organizationExists, allowAdmins, async (req, res, next) => {
  try {
    const {orgId, slideId} = req.params;
    const slide = await handler.getSlide(orgId, slideId);
    if (!slide) {
      res.status(404).json('Slide not found');
    } else {
      const slideDeleted = await handler.deleteSlide(orgId, slideId);
      res.status(200).json('Slide deleted successfully');
    }
  } catch (error) {
    logger.error(error.message);
    res.send('Error deleting slide');
  }
});

module.exports = Router;
