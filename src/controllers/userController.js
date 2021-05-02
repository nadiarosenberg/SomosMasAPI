
const db = require('../models')

module.exports = {

    create: (req, res, next) => {

        db.User.create({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo,

        })

        .then((r) => {res.status(200).json(r)})
        .catch((e) => {res.status(500).json(e)})

    }
}
