const { Slide } = require("../../models/index");

const persist = async (slide) => {
  try {
    const result = await Slide.create(slide);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findAll = async () => {
  try {
    const result = await Slide.findAll({
      order: [['order', 'ASC']]
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (id) => {
  try {
    const result = await Slide.findOne({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, slide) => {
  try {
    const result = await Slide.update({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const destroy = async (id) => {
  try {
    const result = await Slide.destroy({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  persist,
  findAll,
  findOne,
  update,
  destroy,
};
