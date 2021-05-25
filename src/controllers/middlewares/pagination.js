const {check, validationResult} = require('express-validator');

const paginationValidation = () => {
  return [
    check('page').optional({checkFalsy: true}).isInt({min: 1}).withMessage('Page can only be numeric'),
    check('pageSize').optional({checkFalsy: true}).isInt({min: 1}).withMessage('PageSize can only be numeric'),
    check('order').optional({checkFalsy: true}).isIn('ASCDESCascdesc').withMessage('Order is ASC or DESC'),
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
  paginationValidation,
  validate,
};
