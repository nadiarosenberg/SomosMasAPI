const repository = require('../services/repositories/comments');

const deleteComments = async id => {
  const result = await repository.destroy(id);
  return result;
};

const getCommentById = async id => {
  const result = await repository.getOne(id);
  return result;
};

const getAllComments = async () => await repository.getAll();

const postComment = async newComment => await repository.create(newComment);

const putComment = async (editedComment, id) => await repository.update(editedComment, id);

module.exports = {
  deleteComments,
  getCommentById,
  getAllComments,
  postComment,
  putComment,
};
