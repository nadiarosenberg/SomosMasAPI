const repository = require('../services/repositories/comments');

const deleteComments = async id => {
  const result = await repository.destroy(id);
  return result;
};

const getCommentById = async id => {
  const result = await repository.getOne(id);
  return result;
};

const getAllByNewReportId = async id => {
  const result = await repository.getAllByNewReportId(id);
  return result;
};
const getAllComments = async () => await repository.getAll();

const postComment = async newComment => await repository.create(newComment);

const getOneComment = async id => await repository.getOne(id);

const putComment = async (editedComment, id) => await repository.update(editedComment, id);

module.exports = {
  deleteComments,
  getCommentById,
  getAllByNewReportId,
  getAllComments,
  postComment,
  putComment,
};
