const db = require("./../../models");
const Category = db.categories;

const getAll = async () =>  await Category.findAll({attributes: ["name"]})

const getOne = async (id) => await Category.findByPk(id, {paranoid: false})

const create = async (category) => await Category.create(category);

const update = async (category, id) => await Category.update(category, {where: { id: id }});

const deleteOne = async (id) => await Category.destroy({where: { id: id }});

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}