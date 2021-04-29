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

const findOne = async (req, res, next) => {
  try {
    let { id } = req.params;
    let organization = await Organization.findOne({
      where: { id },
      attributes: ['name', 'image', 'phone', 'address']
    });
    
    (organization)
      ? res.status(200).json(organization)
      : res.status(404).json({ message: 'Organization not found'})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
}

const create = async (req, res, next) => {
  try{
    const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body

    let organization = new Organization()
    organization.name = name
    organization.image = image
    organization.address = address
    organization.phone = phone
    organization.email = email
    organization.welcomeText = welcomeText
    organization.aboutUsText = aboutUsText

    let newOrganization = await Organization.create(organization.dataValues)

    res.status(201).json({
      id: newOrganization.id,
      message: 'Organization created successfully'
    })

  } catch(error){
    console.log(error.message)
    res.status(500).json({ message: error.message})
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateValues = req.body

    let organization = await Organization.findOne({
      where: { id }
    })

    if (organization) {
      await Organization.update(
        updateValues,
        {
          where: { id }
        }
      )
      res.status(200).json({ message: 'Organization updated successfully' })
    } else {
      res.status(404).json({ message: 'Organization not found' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message})
  }
}

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params

    let organization = await Organization.findOne({
      where: { id }
    })

    if(organization){

      await Organization.destroy({
        where: { id }
      })

      res.status(200).json({message: 'Organization deleted successfully'})
    } else {
      res.status(404).json({ message: 'Organization not found' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
}