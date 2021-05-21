
'use strict'
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
      attributes: ["imageUrl", "order"],
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

const update = async (slide, id) => {
  console.log(slide);
  try {
    const result = await Slide.update(slide, {
      where: {id}
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

const getSlidesByOrgId = async(orgId) =>{
  try {
    const result = await Slide.findAll({
      where: {organizationId: orgId},
      order:[['order', 'ASC']],
      attributes: ['imageUrl']
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
  getSlidesByOrgId
}