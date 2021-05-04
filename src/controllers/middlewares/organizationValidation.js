const { body, validationResult } = require('express-validator');

const orgValidationRules = () => {
  return [
    body('name').not().isEmpty().withMessage("name can't be empty"),
    body('image').not().isEmpty().withMessage("image can't be empty"),
    body('email').not().isEmpty().withMessage("email can't be empty").isEmail().withMessage("invalid email"),
    body('aboutUsText').not().isEmpty().withMessage("aboutUsText can't be empty")
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
      return next()
  }
  return res.status(400).json({ errors: errors.array() });
}

module.exports = { orgValidationRules, validate  }