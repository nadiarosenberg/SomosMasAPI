const repository = require('../services/repositories/members');

const getAllMembers = async () => {
  const members = await repository.getAll();
  return members;
};

module.exports = {
  getAllMembers,
};
