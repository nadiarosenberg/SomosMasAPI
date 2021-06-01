const {body, validationResult} = require('express-validator');

const contactValidationRules = () => {
  return [
    body('name').notEmpty().withMessage("name can't be empty"),
    body('email').notEmpty().withMessage("email can't be empty").isEmail().withMessage('invalid email'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({errors: errors.array()});
};

module.exports = {
  contactValidationRules, 
  validate
};
