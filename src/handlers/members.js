const repository = require('../services/repositories/members');

const getAllMembers = async () => {
  const members = await repository.getAll();
  return members;
};

const createMember = async (member) => {
  const createdMember = await repository.persist(member);
  return createdMember;
};

module.exports = {
  getAllMembers,
  createMember
};
