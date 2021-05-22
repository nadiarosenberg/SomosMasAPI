const expressRouter = require('express').Router();
const handler = require('../handlers/contacts');
const logger = require('../utils/pinoLogger');
const isAdmin = require('./middlewares/auth');
const { contactValidationRules, validate } = require('./middlewares/contactValidation');
const pagination = require('../utils/pagination');
const { paginationValidation } = require('./middlewares/pagination');

expressRouter.post('/', async (req, res) => {
  try {
    const contactToCreate = req.body;
	console.log(req.body);
	
    const result = await handler.createContact(contactToCreate);
	
    res.status(200).json({ id: result.id, message: 'Contact created successfully' });
	
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
});


expressRouter.get('/', async (req, res) => {
  try {
    const results = await handler.getAllContacts();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message || "Some error occurred while retrieving Contacts."});
  }
});

expressRouter.get('/backoffice',paginationValidation(),validate, async (req, res) => {
  try {
    const paginationInfo = pagination.getPaginationInfo(req.query);
    const results = await handler.getAllContactsPaginate(paginationInfo);
    const route = '/contacts';
    const paginationResult = await pagination.getPaginationResult(paginationInfo, route, results);
    res.status(200).json(paginationResult);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message || "Some error occurred while retrieving Contacts."});
  }
});

module.exports = expressRouter;