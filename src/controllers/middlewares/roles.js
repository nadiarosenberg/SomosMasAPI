const {check, validationResult, oneOf} = require('express-validator');

const rolesValidationRules = () => {
  return [
    check('name').isString().not().isEmpty().withMessage('Name cannot be empty'),
    check('description').isString().not().isEmpty().withMessage('Description cannot be empty'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    errors: errors.array(),
  });
};

const rolesValidationPutRules = () => {
  return [
    oneOf([
      [
        oneOf([check('name').isString().withMessage('Name is only alphanumeric'), check('name').isEmpty()]),
        oneOf([
          check('description').isString().withMessage('Description is only alphanumeric'),
          check('description').isEmpty(),
        ]),
      ],
      oneOf([
        check('name').not().isEmpty().withMessage('Name cannot be empty'),
        check('description').not().isEmpty().withMessage('Description cannot be empty'),
      ]),
    ]),
  ];
};

module.exports = {
  rolesValidationRules,
  validate,
  rolesValidationPutRules,
};
