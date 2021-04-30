const jwt = require('jsonwebtoken')
const db = require('../models')

const Role = db.Role;
const User = db.User;

const authUser = async (req, res, next) => {
    const token = req.get('token')
    let userId;
    let error;
    jwt.verify(token, 'mi-secreto', (err, decoded) => {
        if (err) {
            error = err;
        }else{
            userId = decoded.id;
        }
    })
    if(error){
        res.status(403).json({ error })
    }else{
        const userJoinRole = await User.findOne({ 
            where:{
                id: userId
            },
            include: {
            model: Role,
            as: 'role'
            }
        });
        if(userJoinRole===null){
            return res.status(403).json({
                ok: false,
                error: `invalid credentials`
            })
        }else{
            next()
        }
    }
}


module.exports = {
    authUser
}