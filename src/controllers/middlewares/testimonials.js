const {check, validationResult, oneOf} = require('express-validator')

const testimonialValidationPutRules = () => {
    return [
        oneOf([
            check('name').isString().withMessage('name is only alphabetical'),
            check('name').isEmpty()
        ]),
        oneOf([
            check('content').isString().withMessage('content only alphabetical'),
            check('content').isEmpty()
        ]),
        oneOf([
            check('image').isURL().withMessage('image is URL'),
            check('image').isEmpty()
        ]),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({ errors: errors.array() });
}

module.exports = {testimonialValidationPutRules, validate}