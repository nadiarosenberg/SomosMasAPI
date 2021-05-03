const  {Role}  = require('../models/index')
const Controller = {}

Controller.get = async (req, res) => {
    try  {
        const data = await Role.findAll()
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            error: 'Try again'
        })
    }
}

Controller.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Role.findByPk(id)
        if (data === null) {
            return resp.status(400).json({
              error: 'Id does not exist'
            })
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            error: 'Try again'
        })
    }
}

Controller.patchRole = async (req, res) => {
    const newRol = req.body
    if (!newRol.name || !newRol.description) {
      return res.status(400).json({
        error: 'Try again'
      })
    }
    const data = await Role.update({
      name: newRol.name,
      description: newRol.description,
      updatedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    })
    if (data[0] === 0) {
      return res.status(400).json({
        error: 'invalid ID'
      })
    }
    res.json('The id was modified correctly')
}

Controller.deleteRole = async (req, res) => {
    const data = await Role.destroy({
      where: {
        id: req.params.id
      }
    })
    if (data === 0) {
      return res.status(400).json({
        error: 'invalid ID'
      })
    }
    res.json('id was successfully removed')
}

Controller.postRole = async (req, res) => {
    const newRol = req.body
    if (!newRol.name || !newRol.description) {
        return res.status(400).json({
          error: 'Try again'
        })
    }
    const data = await Role.create({
        name: newRol.name,
        description: newRol.description,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    res.json(data)
}
module.exports = Controller