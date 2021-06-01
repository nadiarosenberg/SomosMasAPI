const expressRouter = require('express').Router();
const handler = require('../handlers/contacts');
const allowAdmins = require('./middlewares/auth');
const {contactValidationRules, validate} = require('./middlewares/contactValidation');
const {paginationValidation} = require('./middlewares/pagination');
const sendContactEmail = require('../utils/ContactEmail');
const pagination = require('../utils/pagination');
const logger = require('../utils/pinoLogger');

expressRouter.post('/', allowAdmins, contactValidationRules(), validate, async (req, res) => {
  try {
    const contactToCreate = req.body;
    const result = await handler.createContact(contactToCreate);
    sendContactEmail(result.email, result.name);
    res.status(200).json({id: result.id, message: 'Contact created successfully'});
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
});

expressRouter.get('/', allowAdmins, paginationValidation(), validate, async (req, res) => {
  try {
    const paginationInfo = pagination.getPaginationInfo(req.query);
    const results = await handler.getAllContactsPaginate(paginationInfo);
    const route = '/contacts';
    const paginationResult = await pagination.getPaginationResult(paginationInfo, route, results);
    res.status(200).json(paginationResult);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: error.message || 'Some error occurred while retrieving Contacts.'});
  }
});

module.exports = expressRouter;
