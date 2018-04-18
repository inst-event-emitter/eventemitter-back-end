const elasticsearch = require('elasticsearch');
const elasticConfig = require('nconf').get('elasticsearch');

const logger = require('../utils/logger')('elasticsearch');

const client = new elasticsearch.Client({
  host: elasticConfig.host,
  log: elasticConfig.log
});

client.ping({
  requestTimeout: 1000
}, (err) => {
  if (err) {
    logger.error(`elasticsearch connection error: ${err}`);
  } else {
    logger.info('Successfully connected to elasticsearch cluster');
  }
});

module.exports = client;
