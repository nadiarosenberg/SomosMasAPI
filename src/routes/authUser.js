const jwt = require('jsonwebtoken')
const db = require('../models')

const Role = db.Role;
const User = db.User;

const authUser = async (req, res, next) => {
    const token = req.get('token')
    jwt.verify(token, 'mi-secreto', (error, decoded) => {
        if (error) {
            return res.status(401).json({ error })
        }
    })
}


module.exports = {
    authUser
}