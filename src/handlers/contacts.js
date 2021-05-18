const repository = require('../services/repositories/contacts');
const sendContactEmail = require('../utils/ContactEmail')
const createContact = async (contact) => {
  const newContact = await repository.persist(contact);
  sendContactEmail(contact.email, contact.name);
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