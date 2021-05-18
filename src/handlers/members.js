const repository = require('../services/repositories/members');
const { getNextPage, getPriorPage } = require('./middlewares/pagination');

const getAllMembers = async (page, limit) => {
  if(!page) page = 1;
  if(!limit) limit = 10;
  const fromMember = page * limit - limit;
  const { count, rows } = await repository.getAll(fromMember, limit);
  const nextPage = getNextPage(count, limit, page, 'members');
  const priorPage = getPriorPage(page, 'members');
  return {
    count,
    rows,
    nextPage,
    priorPage
  };
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
