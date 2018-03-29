const httpErrors = require('http-errors');
const httpStatus = require('http-status');
const { pick } = require('lodash');

const getErrorStatusCode = err =>
  err.status ||
  err.statusCode ||
  httpStatus.INTERNAL_SERVER_ERROR;

const notFound = () => {
  throw new httpErrors.NotFound('Resource not found');
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = getErrorStatusCode(err);
  const data = pick(err, 'message', 'errors');

  res.status(statusCode).json(data);
};

module.exports = {
  notFound,
  errorHandler,
};
