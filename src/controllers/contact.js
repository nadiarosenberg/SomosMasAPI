const expressRouter = require('express').Router();
const handler = require('../handlers/contact');
const logger = require('../utils/pinoLogger');
const isAdmin = require('./middlewares/roleId');
const { contactValidationRules, validate } = require('./middlewares/contactValidation');

expressRouter.post('/',  async (req, res, next) => {
  try {
    const contactToCreate = req.body;
console.log(contactToCreate);
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


module.exports = expressRouter;