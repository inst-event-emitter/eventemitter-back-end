const elasticSearch = require('elasticsearch');
const elasticConfig = require('nconf').get('elasticSearch');
const { get, isNil } = require('lodash');

const getTypeAndIndex = (type) => {
  const typeConfig = elasticConfig[type];

  if (isNil(typeConfig)) {
    throw new Error(`Configuration for '${type}' type is missed`);
  }

  return {
    index: get(typeConfig, 'index', elasticConfig.index),
    type: typeConfig.type
  };
};

const elasticSearchClient = new elasticSearch.Client({
  host: elasticConfig.host,
  log: elasticConfig.log
});

module.exports = {
  getTypeAndIndex,
  elasticSearchClient
};
