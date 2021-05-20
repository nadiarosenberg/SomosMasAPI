const repository = require('../services/repositories/members');
const { getNextPage, getPriorPage } = require('./middlewares/pagination');

const getAllMembers = async (paginationInfo) => await repository.getAll(paginationInfo);

const createMember = async (member) => {
  const createdMember = await repository.persist(member);
  return createdMember;
};

const deleteMember = async (id) => {
  const result = await repository.destroyMember(id);
  return result;
}

module.exports = {
  getAllMembers,
  createMember,
  deleteMember
};
