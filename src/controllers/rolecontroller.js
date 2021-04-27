const { Role } = require('../../app/database/models/index')

module.exports = {
    async all(req, res) {
        try {
            const roles = await Role.findAll({})
            res.status(200).json(roles)
        } catch (err) {
            res.status(500).json({
                error: 'Try again'
            })
        }
    }
}