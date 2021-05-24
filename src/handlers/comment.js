const repository = require('./../services/repositories/comment');

const getAllComments = async () => {
    const comments = await repository.getAll();
    return comments;
}

const getOneComment = async (id) => {
    const comment = await repository.getOne(id);
    return comment;
}

const postComment = async (newComment) => {
    const comment = await repository.create(newComment);
    return comment;
}

const putComment = async (editedComment, id) => {
    const comment = await repository.update(editedComment, id);
    return comment;
}

const deleteComment = async (id) => {
    const comment = await repository.deleteOne(id);
    return comment;
}

module.exports = {
    getAllComments,
    getOneComment,
    postComment,
    putComment,
    deleteComment
}