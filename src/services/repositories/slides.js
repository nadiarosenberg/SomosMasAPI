const {Slide} = require("../models/index");

const persist = async (slide) => {
    try {
        const result = await Slide.create(slide);
        return result;
    }catch (error) {
        console.log(error);
        res.send("Error posting slides");
    }
};
    
const findAll = async () => {
  try {
    const result = await Slide.findAll();
    return result;
  } catch (error) {
    console.log(error);
    res.send("Error getting slides");
  }
};

const findOne = async (slideId) => {
  try {
    const result = await Slide.findOne({
        where: {slideId}
    });
    return result
  } catch (error) {
    console.log(error);
    res.send("Error getting slide");
  }
};

const update = async (slideId, slide) => {
  try {
      const result = await Slide.update({
          where: {slideId}
      })
      return result
  } catch (error) {
    console.log(error);
    res.send("Error updating slide");
  }
};

const destroy = async (slideId) => {
  try {
    const result = await Slide.destroy({
      where: {slideId},
    })
    return result
  } catch (error) {
    console.log(error);
    res.send("Error deleting slide");
  }
};

module.exports = {
    persist,
    findAll,
    findOne,
    update,
    destroy
};