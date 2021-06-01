const {check, validationResult, oneOf} = require('express-validator');
const { User, Role } = require('./../../models');

const userValidationRules = () => {
  return [
    check('firstName')
      .notEmpty().withMessage("First name can't be empty")
      .isString().withMessage('First name should be string'),
    check('lastName')
      .notEmpty().withMessage("Last name can't be empty")
      .isString().withMessage('Last name should be string'),
    check('email')
      .isEmail().withMessage('Your email is not valid').normalizeEmail()
      .notEmpty().withMessage("E-mail can't be empty"),
    check('email')
      .custom( async (value) => {
        let res = await User.findOne({where:{ email: value }});
        if(res) return Promise.reject('E-mail already in use');
      }),
    check('password')
      .notEmpty().withMessage("password can't be empty")
      .isLength({
        min: 5,
      }).withMessage('Your password must be at least 5 characters'),
    check('password').isAlphanumeric().withMessage("password can't contain blanks"),
    check('roleId')
      .optional()
      .custom( async (value) => {
        let res = await Role.findByPk(value);
        if(!res) return Promise.reject('invalid role id');
      }),
  ];
};

const loginValidateRules = () => {
  return [
    check('email')
      .isEmail().withMessage('Your email is not valid').normalizeEmail()
      .notEmpty().withMessage("E-mail can't be empty"),
    check('password')
      .notEmpty().withMessage("password can't be empty")
      .isLength({
        min: 4,
      }).withMessage('Your password must be at least 5 characters'),
    check('password').isAlphanumeric().withMessage("password can't contain blanks"),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({errors: errors.array()});
};

const userValidationPutRules = () => {
  return [
    oneOf([check('lastName').isAlpha().withMessage('Last name is only alphabetical'), check('lastName').isEmpty()]),
    oneOf([check('firstName').isAlpha().withMessage('Last name is only alphabetical'), check('firstName').isEmpty()]),
    oneOf([
      check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
      check('email').isEmpty(),
    ]),
    oneOf([
      check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({
        min: 5,
      }),
      check('password').isEmpty(),
    ]),
    oneOf([check('password', 'Blank spaces are not allowed').isAlphanumeric(), check('password').isEmpty()]),
  ];
};

module.exports = {userValidationRules, validate, userValidationPutRules, loginValidateRules};
