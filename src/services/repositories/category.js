const db = require("./../../models");
const Category = db.categories;

const getAll = async () => {
    const result = await Category.findAll({attributes: ["name"]});
    return result;
}

const getOne = async (id) => {
    const result = await Category.findByPk(id, {paranoid: false});
    return result;
}

const create = async (category) => {
    const result = await Category.create(category);
    return result;
}

const update = async (category, id) => {
    const result = await Category.update(category, {
        where: { id: id }
      });
    return result;
}

const deleteOne = async (id) => {
    const result = await Category.destroy({
        where: { id: id }
      });
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}