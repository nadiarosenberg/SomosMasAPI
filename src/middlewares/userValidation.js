const {check, validationResult} = require('express-validator')

const userValidationRules = () => {
    return [
        check('firstName').isAlpha().not().isEmpty().withMessage('First name cannot be empty'),
        check('lastName').isAlpha().not().isEmpty().withMessage('Last name cannot be empty'),
        check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
        check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({
            min: 5
        }),
        check('password', 'no espacios en blanco').isAlphanumeric()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({ errors: errors.array() });
}

module.exports = {userValidationRules, validate}
