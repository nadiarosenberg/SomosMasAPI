const {body, oneOf, check, validationResult} = require('express-validator');

const orgValidationRules = () => {
  return [
    body('name').not().isEmpty().withMessage('name can not be empty').isString().withMessage('Invalid name'),
    body('image').not().isEmpty().withMessage('image can not be empty'),
    body('address').optional().isString().withMessage('Invalid adress'),
    body('phone').optional().isAlphanumeric().withMessage('Invalid phone'),
    body('email').not().isEmpty().withMessage('email can not be empty').isEmail().withMessage('Invalid email'),
    body('welcomeText').not().isEmpty().withMessage('welcomeText can not be empty').isString().withMessage('Invalid welcomeText'),
    body('aboutUsText').optional().isString().withMessage('Invalid aboutUsText'),
    oneOf([
      check('facebook').optional().isURL().withMessage('Invalid facebook'),
      check('facebook').optional().isEmpty()
    ]),
    oneOf([
      check('instagram').optional().isURL().withMessage('Invalid instagram'),
      check('instagram').optional().isEmpty()
    ]),
    oneOf([
      check('linkedin').optional().isURL().withMessage('Invalid linkedin'),
      check('linkedin').optional().isEmpty()
    ])
  ];
};

const orgValidationPutRules = () => {
  return [
    body('name').optional().not().isEmpty().withMessage('name can not be null').isString().withMessage('Invalid name'),
    body('image').optional().not().isEmpty().withMessage('Image can not be null'),
    body('address').optional().isString().withMessage('Invalid adress'),
    body('phone').optional().isAlphanumeric().withMessage('Invalid phone'),
    body('email').optional().not().isEmpty().withMessage('email can not be null').isEmail().withMessage('Invalid email'),
    body('welcomeText').optional().not().isEmpty().withMessage('welcomeText can not be empty').isString().withMessage('Invalid welcomeText'),
    body('aboutUsText').optional().isString().withMessage('Invalid aboutUsText'),
    oneOf([
      check('facebook').optional().isURL().withMessage('Invalid facebook'),
      check('facebook').optional().isEmpty()
    ]),
    oneOf([
      check('instagram').optional().isURL().withMessage('Invalid instagram'),
      check('instagram').optional().isEmpty()
    ]),
    oneOf([
      check('linkedin').optional().isURL().withMessage('Invalid linkedin'),
      check('linkedin').optional().isEmpty()
    ])
  ];
};

const slidesValidationRules = () => {
  return [
    body('imageUrl').optional().isString().withMessage('Invalid imageUrl'),
    body('text').optional().isString().withMessage('Invalid text'),
    body('order').optional().isInt().withMessage('Invalid order'),
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
  orgValidationRules,
  orgValidationPutRules,
  slidesValidationRules,
  validate
};
