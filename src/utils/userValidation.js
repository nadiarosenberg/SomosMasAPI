const {check, validationResult, oneOf} = require('express-validator')

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

const userValidationPutRules = () => {
    return [
        oneOf([
            check('lastName').isAlpha().withMessage('Last name is only alphabetical'),
            check('lastName').isEmpty()
        ]),
        oneOf([
            check('firstName').isAlpha().withMessage('Last name is only alphabetical'),
            check('firstName').isEmpty()
        ]),
        oneOf([
            check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
            check('email').isEmpty()
        ]),
        oneOf([
            check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({
                min: 5
            }),
            check('password').isEmpty()
        ]),
        oneOf([
            check('password', 'Blank spaces are not allowed').isAlphanumeric(),
            check('password').isEmpty()
        ]),
    ]
}

module.exports = {userValidationRules, validate, userValidationPutRules}
