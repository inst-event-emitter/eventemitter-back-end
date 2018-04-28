const elasticSearch = require('elasticsearch');
const elasticConfig = require('nconf').get('elasticSearch');

const elasticSearchClient = new elasticSearch.Client({
  host: elasticConfig.host,
  log: elasticConfig.log
});

module.exports = elasticSearchClient;
