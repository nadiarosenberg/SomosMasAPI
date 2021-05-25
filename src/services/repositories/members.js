const {Members} = require('../../models');
const logger = require('../../utils/pinoLogger');
const {getPaginationParams} = require('../../utils/pagination');

const getAll = async paginationInfo => {
  try {
    const paginationData = getPaginationParams(paginationInfo, 'id');
    const result = await Members.findAndCountAll({
      ...paginationData,
      attributes: ['id', 'name', 'image'],
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const persist = async memberToPersist => {
  try {
    const result = await Members.create(memberToPersist);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const destroyMember = async id => {
  try {
    const result = await Members.destroy({
      where: {id},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getOne = async id => {
  try {
    const result = await Members.findOne({
      where: {id},
    });

    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (id, properties) => {
  try {
    const result = await Members.update(properties, {
      where: {id},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};
module.exports = {
  getAll,
  persist,
  destroyMember,
  getOne,
  update,
};
