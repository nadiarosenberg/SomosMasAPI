const repository = require('../services/repositories/contacts');

const createContact = async (contact) => {
  const newContact = await repository.persist(contact);
  return newContact;
}

module.exports = {
  createContact,
}