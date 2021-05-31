const {Comments} = require('../../models');

const destroy = async id => {
  try {
    const result = await Comments.destroy({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getOne = async id => {
  try {
    const result = await Comments.findOne({
      where: {id},
      attributes: ['id', 'userId', 'newReportId', 'body'],
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getAll = async () => {
  const result = await Comments.findAll({
    attributes: ['body'],
    order: [['createdAt', 'DESC']],
  });
  return result;
};

const create = async comment => {
  const result = await Comments.create(comment);
  return result;
};

const update = async (comment, id) => {
  const result = await Comments.update(comment, {
    where: {id: id},
  });
  return result;
};

module.exports = {
  destroy,
  getAll,
  getOne,
  create,
  update,
};
