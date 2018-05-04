const httpErrors = require('http-errors');
const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');
const { pick, get } = require('lodash');

const getErrorStatusCode = (err) => {
  if (err instanceof ValidationError) {
    return 400;
  }

  return err.status ||
    err.statusCode ||
    httpStatus.INTERNAL_SERVER_ERROR;
};

const notFound = () => {
  throw new httpErrors.NotFound('Resource not found');
};

const prepareValidationError = err => ({
  message: get(err, 'statusText', 'Expect valid parameters'),
  errors: get(err, 'errors', []).map(error => ({
    location: get(error, 'location'),
    field: get(error, 'field[0]'),
    messages: get(error, 'messages'),
  })),
});

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = getErrorStatusCode(err);

  res.status(statusCode).json(err instanceof ValidationError
    ? prepareValidationError(err)
    : pick(err, 'message', 'errors'));
};

module.exports = {
  notFound,
  errorHandler,
};
