const genericMiddlewares = {
  checkIdInPath: (req, res, next) => {
    if (isNaN(req.params.id)) {
      res.status(400).send('id must be an integer');
    } else {
      next();
    }
  },
};

module.exports = {
  genericMiddlewares,
};
