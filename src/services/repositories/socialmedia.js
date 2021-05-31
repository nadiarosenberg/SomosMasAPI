const {SocialMedia} = require('../../models');
const logger = require('../../utils/pinoLogger');

const persist = async socialmedia => {
  try {
    const result = await SocialMedia.create(socialmedia);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const getOne = async orgId => {
  try {
    const result = await SocialMedia.findOne({
      where: {organizationId: orgId}
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

const update = async (socialmedia, orgId) => {
  try {
    const result = await SocialMedia.update(socialmedia, {
      where: {organizationId: orgId},
    });
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  persist,
  getOne,
  update
};
