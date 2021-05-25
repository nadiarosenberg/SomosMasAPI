const repository = require('../services/repositories/members');

const getAllMembers = async paginationInfo => await repository.getAll(paginationInfo);

const createMember = async member => {
  const createdMember = await repository.persist(member);
  return createdMember;
};

const deleteMember = async id => {
  const result = await repository.destroyMember(id);
  return result;
};
const getMemberById = async id => {
  const member = await repository.getOne(id);
  return member;
};
const updateMember = async (id, properties) => await repository.update(id, properties);

module.exports = {
  getAllMembers,
  createMember,
  deleteMember,
  getMemberById,
  updateMember,
};
