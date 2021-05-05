const expressRouter = require('express').Router();
const path = require('path');
const handler = require('../handlers/activity');
const logger = require('../utils/pinoLogger');
const roleIdMiddleware = require("../controllers/middlewares/roleId.js");
const { activityValidationRules, validate } = require('../controllers/middlewares/activityValidation');

expressRouter.post('/',  roleIdMiddleware, activityValidationRules(), validate, async (req, res) => {
  try {
    const activity = {
      name: req.body.name ? req.body.name : 'pepe',
      content: req.body.content ? req.body.content : 'Loren',
      image: req.body.image ? req.body.image : 'randomimage.png'
    };
  
    const extensionsAvailable = ['png', 'jpg', 'jpeg'];
    const ext = path.extname(activity.image || '').split('.');
    if (extensionsAvailable.indexOf(ext[ext.length - 1]) < 0) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid url',
        errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ') }
      })
    }

    const newActivity = await handler.createActivity(activity);
    logger.info({ id: newActivity.id }, 'Activity created successfully');
    res.status(201).json({
      id: newActivity.id,
      message: 'Activity created successfully'
    })
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

expressRouter.get('/', async (req, res) => {
  try {
    const results = await handler.getAllActivities();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
});

module.exports = expressRouter;