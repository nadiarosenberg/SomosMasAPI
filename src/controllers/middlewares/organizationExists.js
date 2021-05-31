const logger = require('../../utils/pinoLogger');
const handler = require('../../handlers/organizations');


const organizationExists = async(req, res, next) =>{
  const {orgId} = req.params;
  try{
    const organization = await handler.getOrganization(orgId);
    if (!organization) {
      logger.warn('Organization not found');
      return res.status(400).json({message: 'Organization not found'});
    } else {
      return next();
    }
  }catch(error){
    logger.error(error.message);
    res.status(500).json({message: error.message});
  }
};

module.exports = organizationExists; 