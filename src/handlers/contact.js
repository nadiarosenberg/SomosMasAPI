const repository = require('../services/repositories/contact');

const createContact = async (contact) => {
  const newContact = await repository.persist(contact);
  return newContact;
}

module.exports = {
  createContact,
}