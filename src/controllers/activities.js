const expressRouter = require('express').Router();
const path = require('path');
const handler = require('../handlers/activity');
const logger = require('../utils/pinoLogger');
const {activityValidationRules, validate} = require('./middlewares/activities');
const allowAdmins = require('./middlewares/auth');

expressRouter.post('/', allowAdmins, activityValidationRules(), validate, async (req, res) => {
  try {
    const activity = {
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
    };

    const extensionsAvailable = ['png', 'jpg', 'jpeg'];
    const ext = path.extname(activity.image || '').split('.');
    if (extensionsAvailable.indexOf(ext[ext.length - 1]) < 0) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid url',
        errors: {message: 'You must select a url with extension: ' + extensionsAvailable.join(', ')},
      });
    }

    const newActivity = await handler.createActivity(activity);
    logger.info({id: newActivity.id}, 'Activity created successfully');
    res.status(201).json({
      id: newActivity.id,
      message: 'Activity created successfully',
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || 'Some error occurred while creating the Activity.'});
  }
});

expressRouter.get('/', async (req, res) => {
  try {
    const results = await handler.getAllActivities();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || 'Some error occurred while retrieving Activity.'});
  }
});

expressRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const activity = await handler.getActivityById(id);

    if (!activity) {
      logger.warn('Activity not found');
      res.status(404).json({message: 'activity not found'});
      return;
    }

    res.status(200).json(activity);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || 'Error retrieving Activity with id = ' + id});
  }
});

expressRouter.put('/:id', allowAdmins, async (req, res) => {
  try {
    const {id} = req.params;
    const updateValues = req.body;

    let anActivity = await handler.getActivityById(id);

    if (!anActivity) {
      logger.warn('Activity not found');
      res.status(404).json({message: 'Activity not found'});
      return;
    }

    await handler.updateActivity(id, updateValues);
    logger.info('Activity updated successfully');
    res.status(200).json({message: 'Activity updated successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || `Cannot update Activity with id = ${id}.`});
  }
});

expressRouter.delete('/:id', allowAdmins, async (req, res, next) => {
  try {
    const {id} = req.params;

    let activity = await handler.getActivityById(id);

    if (!activity) {
      logger.warn('Activity not found');
      res.status(404).json({message: 'Activity not found'});
      return;
    }

    await handler.deleteActivity(id);

    logger.info('Activity deleted successfully');
    res.status(200).json({message: 'Activity deleted successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || `Could not delete Activity with id = ${id}`});
  }
});

module.exports = expressRouter;
