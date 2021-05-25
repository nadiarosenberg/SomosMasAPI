const {body, validationResult} = require('express-validator');

const validate = async (req, res, next) => {
  await body('name')
    .not()
    .isEmpty()
    .withMessage("name can't be empty")
    .isString()
    .withMessage('name has to be a string')
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  return next();
};

module.exports = {validate};
