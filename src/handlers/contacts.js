const repository = require('../services/repositories/contacts');
const sendContactEmail = require('../utils/ContactEmail');

const createContact = async (contact) => {
  const newContact = await repository.persist(contact);
  sendContactEmail(contact.email, contact.name);
  return newContact;
}

const getAllContacts = async () => {
  const contacts = await repository.getAll();
  return contacts;
};

const getAllContactsPaginate = async (paginationInfo) => await repository.getAll(paginationInfo);

module.exports = {
  createContact,
  getAllContacts,
  getAllContactsPaginate
};