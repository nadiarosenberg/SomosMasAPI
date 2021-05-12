const repository = require('../services/repositories/members');

const getAllMembers = async () => {
  const members = await repository.getAll();
  return members;
};

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
