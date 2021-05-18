const db = require("./../../models");
const Comment = db.comments;

const getAll = async () => await Comment.findAll();

const getOne = async (id) => await Comment.findByPk(id, {paranoid: false});

const create = async (comment) => await Comment.create(comment);
    
const update = async (comment, id) => await Comment.update(comment, {where: { id: id }});

const deleteOne = async (id) => await Comment.destroy({where: { id: id }});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}