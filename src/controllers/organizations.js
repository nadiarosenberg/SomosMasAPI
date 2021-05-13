const expressRouter = require('express').Router();
const handler = require('../handlers/organization');
const handlerSlides = require('../handlers/slides');
const logger = require('../utils/pinoLogger');
const roleIdMiddleware = require('./middlewares/auth');
const { orgValidationRules, validate } = require('./middlewares/organizations');

expressRouter.post('/', roleIdMiddleware, orgValidationRules(), validate, async (req, res, next) => {
  try {
      const organizationToCreate = req.body;
      const result = await handler.createOrganization(organizationToCreate);
      logger.info({ id: result.id }, 'Organization created successfully')
      res.status(201).json({
        id: result.id,
        message: 'Organization created successfully'
      })
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message})
  }
});

expressRouter.get('/', roleIdMiddleware, async (req, res, next) => {
  try {
    const results = await handler.getAllOrganizations();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.get('/public/:id', roleIdMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const organization = await handler.getOrganizationById(id);
    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    const slides = await handlerSlides.getSlidesByOrgId(id);
    res.status(200).json({"organizationInfo": organization, "slides": slides});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.put('/public/:id', roleIdMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateValues = req.body;

    let organization = await handler.getOrganizationById(id);

    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    await handler.updateOrganization(id, updateValues);
    logger.info('Organization updated successfully');
    res.status(200).json({ message: 'Organization updated successfully' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.delete('/:id', roleIdMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    let organization = await handler.getOrganizationById(id);

    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    await handler.deleteOrganization(id);

    logger.info('Organization deleted successfully');
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
})

expressRouter.post('/:id', roleIdMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const organizationDeleted = await handler.retoreOrganization(id);
    console.log(organizationDeleted);
    logger.info('Organization restored successfully')
    res.status(200).json({ message: 'Organization restored successfully'})
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
})

module.exports = expressRouter;