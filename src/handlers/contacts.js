const repository = require('../services/repositories/contacts');

const createContact = async (contact) => await repository.persist(contact);

const getAllContactsPaginate = async (paginationInfo) => await repository.getAll(paginationInfo);

module.exports = {
  createContact,
  getAllContactsPaginate
};
