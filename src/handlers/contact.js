const repository = require('../services/repositories/contact');

const createContact = async (contact) => {
  const newContact = await repository.persist(contact);
  return newContact;
}

const getAllContacts = async () => {
  const contacts = await repository.getAll();
  return contacts;
};

module.exports = {
  createContact,
  getAllContacts
}