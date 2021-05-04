const expressRouter = require('express').Router();
const handler = require('./../handlers/organization');
const logger = require('../utils/pinoLogger');

expressRouter.post('/', async (req, res, next) => {
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

expressRouter.get('/', async (req, res, next) => {
  try {
    const results = await handler.getAllOrganizations();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.get('/public/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const organization = await handler.getOrganizationById(id);

    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.put('/public/:id', async (req, res, next) => {
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

expressRouter.delete('/:id', async (req, res, next) => {
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

module.exports = expressRouter;