const {check, validationResult} = require('express-validator');

const commentValidationPost = () => {
  return [
    check('newReportId').notEmpty().withMessage('newReportId cannot be empty'),
    check('userId').notEmpty().withMessage('userId cannot be empty'),
    check('body').notEmpty().withMessage('body cannot be empty'),
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
  commentValidationPost,
  validate,
};
