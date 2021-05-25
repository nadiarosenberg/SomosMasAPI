const db = require('./../../models');
const Category = db.categories;
const {getPaginationParams} = require('../../utils/pagination');

const getAll = async paginationInfo => {
  try {
    const paginationData = getPaginationParams(paginationInfo, 'id');
    const result = await Category.findAndCountAll({
      ...paginationData,
      attributes: ['name'],
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getOne = async id => await Category.findByPk(id, {paranoid: false});

const create = async category => await Category.create(category);

const update = async (category, id) => await Category.update(category, {where: {id: id}});

const deleteOne = async id => await Category.destroy({where: {id: id}});

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
