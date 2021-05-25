const {body, validationResult} = require('express-validator');

const memberValidationRules = () => {
  return [
    body('name').not().isEmpty().withMessage("name can't be empty"),
    body('image').not().isEmpty().withMessage("image can't be empty"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({errors: errors.array()});
};

module.exports = {memberValidationRules, validate};
