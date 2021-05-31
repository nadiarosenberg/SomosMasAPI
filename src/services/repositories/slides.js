'use strict';
const {Slide} = require('../../models');
const Sequelize = require('sequelize');
const logger = require('../../utils/pinoLogger');

const persist = async slide => {
  try {
    const result = await Slide.create(slide);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getAll = async orgId => {
  try {
    const result = await Slide.findAll({
      attributes: ['imageUrl', 'order'],
      order: [['order', 'ASC']],
      where: {organizationId: orgId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getOne = async (orgId, slideId) => {
  try {
    const result = await Slide.findOne({
      where: {organizationId: orgId, id: slideId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (orgId, slideId, slide) => {
  try {
    const result = await Slide.update(slide, {
      where: {organizationId: orgId, id: slideId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const destroy = async (orgId, slideId) => {
  try {
    const result = await Slide.destroy({
      where: {organizationId: orgId, id: slideId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getSlidesByOrgId = async orgId => {
  try {
    const result = await Slide.findAll({
      order: [['order', 'ASC']],
      attributes: ['imageUrl'],
      where: {organizationId: orgId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const lastOrder = async orgId => {
  try {
    const result = await Slide.findOne({
      order: [['order', 'DESC']],
      attributes: ['order'],
      where: {organizationId: orgId},
    });
    if (!result) {
      return 0;
    } else {
      return result.order;
    }
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  persist,
  getAll,
  getOne,
  update,
  destroy,
  getSlidesByOrgId,
  lastOrder
};
