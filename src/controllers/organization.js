const { Organization } = require('../models/index');

const findAll = async (req, res, next) => {
  try {
    let organizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address']
    });
    res.status(200).json(organizations)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: 'Something goes wrong'})
  }
};

module.exports = {
  findAll
}