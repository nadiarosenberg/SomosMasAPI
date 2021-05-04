var express = require('express');
var router = express.Router();
const {
    userValidationRules,
    validate,
    userValidationPutRules
} = require('./middlewares/userValidation')
const handler = require('./../handlers/users');

router.post('/auth/register', userValidationRules(), validate, async (req, res, next) => {
    try {
        const user = req.body;
        const result = await handler.createUser(user);
        res.status(204).json(result);
    } catch (e) {
        res.status(400).json({
            ok: false,
            msj: 'failed to create user'
        });
    }
})

router.put('/:id', userValidationPutRules(), validate, async (req, res, next) => {
    try {
        const newUser = req.body;
        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password, 8);
        }
    } catch (e) {
        res.status(400).json({
            ok: false,
            msj: 'failed to update user'
        });
    }
})

module.exports = router;
