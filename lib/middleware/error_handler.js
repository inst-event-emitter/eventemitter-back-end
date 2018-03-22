import httpErrors from 'http-errors';
import httpStatus from 'http-status';
import { pick } from 'lodash';

const getErrorStatusCode = (err) => {
  const statusCode = err.status || err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  return statusCode;
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = getErrorStatusCode(err);
  const data = pick(err, 'message', 'errors');

  res.status(statusCode).json(data);
};

errorHandler.notFound = () => {
  throw new httpErrors.NotFound('Resource not found');
};

module.exports = errorHandler;
