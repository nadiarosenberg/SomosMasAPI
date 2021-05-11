const expressRouter = require('express').Router();
const handler = require('../handlers/contact');
const logger = require('../utils/pinoLogger');
const isAdmin = require('./middlewares/roleId');
const { contactValidationRules, validate } = require('./middlewares/contactValidation');

expressRouter.post('/', isAdmin, contactValidationRules(), validate, async (req, res, next) => {
  try {
    const contactToCreate = req.body;

    const result = await handler.createContact(contactToCreate);
    res.status(200).json({ id: result.id, message: 'Contact created successfully' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = expressRouter;