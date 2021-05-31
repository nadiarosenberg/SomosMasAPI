const {Testimonial} = require('../../models');
const pagination = require('../../utils/pagination');

const getAll = async (paginationInfo) => {
  try {
    const paginationData = pagination.getPaginationParams(paginationInfo, 'id');
    const result = await Testimonial.findAndCountAll({...paginationData, 
      attributes: {exclude: ['updatedAt', 'deletedAt', 'createdAt']}});
      return result;
  } catch (e) {
    console.log(e);
  }
  
}


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
