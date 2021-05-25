const {check, validationResult, oneOf} = require('express-validator');

const testimonialValidationPutRules = () => {
  return [
    oneOf([check('name').isString().withMessage('name is only alphabetical'), check('name').isEmpty()]),
    oneOf([check('content').isString().withMessage('content only alphabetical'), check('content').isEmpty()]),
    oneOf([check('image').isURL().withMessage('image is URL'), check('image').isEmpty()]),
  ];
};

const testimonialValidationPostRules = () => {
  return [
    check('name').notEmpty().withMessage('name cannot be empty'),
    check('content').notEmpty().withMessage('content cannot be empty'),
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
  testimonialValidationPutRules,
  testimonialValidationPostRules,
  validate,
};
