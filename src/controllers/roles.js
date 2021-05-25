const expressRouter = require('express').Router();
const handler = require('../handlers/roles');
const {pino} = require('../utils/pinoLogger');
const logger = require('../utils/pinoLogger');
const {rolesValidationRules, validate, rolesValidationPutRules} = require('./middlewares/roles');
const allowAdmins = require('./middlewares/auth');

expressRouter.post('/', allowAdmins, rolesValidationRules(), validate, async (req, res, next) => {
  try {
    const roleToCreate = req.body;
    const result = await handler.createRole(roleToCreate);
    logger.info({id: result.id}, 'Role created successfully');
    res.status(201).json({
      id: result.id,
      message: 'Role created successfully',
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.get('/', async (req, res, next) => {
  try {
    const results = await handler.getAllRoles();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const role = await handler.getRoleById(id);

    if (!role) {
      logger.warn('role not found');
      res.status(404).json({message: 'Role not found'});
      return;
    }

    res.status(200).json(role);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.put('/:id', allowAdmins, rolesValidationPutRules(), validate, async (req, res, next) => {
  try {
    const {id} = req.params;
    const updateValues = req.body;

    let role = await handler.getRoleById(id);

    if (!role) {
      logger.warn('Role not found');
      res.status(404).json({message: 'Role not found'});
      return;
    }

    await handler.updateRole(id, updateValues);
    logger.info('Role updated successfully');
    res.status(200).json({message: 'Role updated successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.delete('/:id', allowAdmins, async (req, res, next) => {
  try {
    const {id} = req.params;

    let role = await handler.getRoleById(id);

    if (!role) {
      logger.warn('Role not found');
      res.status(404).json({message: 'Role not found'});
      return;
    }

    await handler.deleteRole(id);

    logger.info('Role deleted successfully');
    res.status(200).json({message: 'Role deleted successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.post('/:id', allowAdmins, async (req, res, next) => {
  try {
    const {id} = req.params;

    const role = await handler.retoreRole(id);
    logger.info('Role restored successfully');
    res.status(200).json({message: 'Role restored successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

module.exports = expressRouter;
