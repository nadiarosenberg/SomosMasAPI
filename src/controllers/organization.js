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
})

module.exports = expressRouter;