const repository = require("../services/repositories/comments");

const deleteComments = async (id) => {
  const result = await repository.destroy(id);
  return result;
};

const getCommentById = async (id) => {
  const result = await repository.getOne(id);
  return result;
};

module.exports = {
  deleteComments,
  getCommentById
};
