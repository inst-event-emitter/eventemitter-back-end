require('../config');

const logger = require('../utils/logger')('initializer');
const elasticSearchClient = require('../services/elasticSearch');

const elasticSearchInitialization = () => new Promise((resolve, reject) => {
  elasticSearchClient.ping({
    requestTimeout: 1000
  }, (err) => {
    if (err) {
      logger.error(`elasticsearch connection error: ${err}`);
      reject(err);
    } else {
      logger.info('Successfully connected to elasticsearch cluster');
      resolve();
    }
  });
});

module.exports.appReady = () => Promise.all([
  elasticSearchInitialization(),
])
  .then(() => {
    logger.info('Successfully initialize all services');
  })
  .catch((err) => {
    logger.error(`Initialization error: ${err}`);
  });
