const { chain, isNaN } = require('lodash');
const { BadRequest } = require('http-errors');

module.exports = (query, defaults) => {
  const { limit, offset } = chain(query)
    .pick('limit', 'offset')
    .defaults(defaults)
    .mapValues(Number)
    .value();

  if (isNaN(limit) || limit < 1 || isNaN(offset) || offset < 0) {
    throw new BadRequest('Invalid pagination parameters');
  }

  return { limit, offset };
};
