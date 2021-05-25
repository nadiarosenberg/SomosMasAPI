const repository = require('../services/repositories/category');

const getAllCategories = async paginationInfo => await repository.getAll(paginationInfo);

const getOneCategory = async id => {
  const category = await repository.getOne(id);
  return category;
};

const postCategory = async newCategory => {
  const category = await repository.create(newCategory);
  return category;
};

const putCategory = async (editedCategory, id) => {
  const category = await repository.update(editedCategory, id);
  return category;
};

const deleteCategory = async id => {
  const category = await repository.deleteOne(id);
  return category;
};

module.exports = {
  getAllCategories,
  getOneCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
