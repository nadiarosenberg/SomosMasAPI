const {Testimonial} = require('../../models');

const getAll = async () => {
  const result = await Testimonial.findAll();
  return result;
};

const getOne = async id => {
  const result = await Testimonial.findByPk(id);
  console.log(result);
  return result;
};

const create = async testimonial => {
  const result = await Testimonial.create(testimonial);
  return result;
};

const update = async (testimonial, id) => {
  const result = await Testimonial.update(testimonial, {
    where: {id: id},
  });
  return result;
};

const deleteOne = async id => {
  const result = await Testimonial.destroy({
    where: {id: id},
  });
  return result;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
