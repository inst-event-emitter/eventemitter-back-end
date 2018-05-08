require('../config');

const logger = require('../utils/logger')('initializer');
const { elasticSearchClient } = require('../services/elasticSearch');
const { initExportEventsQueue } = require('../services/exportEventsService');

const elasticSearchInitialization = () => new Promise((resolve, reject) => {
  elasticSearchClient.ping({
    requestTimeout: 1000
  }, (err) => {
    if (err) {
      logger.error('Elasticsearch connection error', err);
      reject(err);
    }
    logger.info('Successfully connected to elasticsearch cluster');
    resolve();
  });
});

const initEventsExportService = () => new Promise((resolve, reject) => {
  initExportEventsQueue()
    .then(() => {
      logger.info('Successfully initialize events export service');
      resolve();
    })
    .catch((err) => {
      logger.error('Events export service initialization error', err);
      reject(err);
    });
});

module.exports.appReady = () => Promise.all([
  elasticSearchInitialization(),
  initEventsExportService(),
])
  .then(() => {
    logger.info('All services initialized successfully');
  })
  .catch((err) => {
    logger.error(`Initialization error: ${err}`);
  });
