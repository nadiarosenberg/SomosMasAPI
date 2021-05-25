const errorsDict = {
  1364: {
    parser: err => `${err.parent.sqlMessage}, that field can't be null/empty`,
    statusCode: 400,
  },
  1452: {
    parser: err => `That ${err.fields} on table ${err.table} is invalid`,
    statusCode: 400,
  },
  default: {
    parser: err => 'Something horrible happened (fault on server)',
    statusCode: 500,
  },
};

const errorHandler = err => {
  return errorsDict[err.parent.errno]
    ? {
        message: errorsDict[err.parent.errno].parser(err),
        statusCode: errorsDict[err.parent.errno].statusCode,
      }
    : {
        message: errorsDict['default'].parser(err),
        statusCode: errorsDict['default'].statusCode,
      };
};

module.exports = errorHandler;
