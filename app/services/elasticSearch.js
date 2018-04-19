const elasticSearch = require('elasticsearch');
const elasticConfig = require('nconf').get('elasticSearch');

const logger = require('../utils/logger')('elasticSearch');

const elasticSearchClient = new elasticSearch.Client({
  host: elasticConfig.host,
  log: elasticConfig.log
});

elasticSearchClient.ping({
  requestTimeout: 1000
}, (err) => {
  if (err) {
    logger.error(`elasticsearch connection error: ${err}`);
  } else {
    logger.info('Successfully connected to elasticSearch cluster');
  }
});

module.exports = elasticSearchClient;
