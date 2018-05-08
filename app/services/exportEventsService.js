const logger = require('../utils/logger')('exportEvevntsService');
const { createExportQueue } = require('../utils/redisQueue');

let eventsQueue;

const initEventsQueue = () => createExportQueue('eventsQueue')
  .then((queue) => {
    eventsQueue = queue;
    logger.info('Successfully connected to Redis');

    eventsQueue.on('error', (err) => {
      logger.error('Redis error', err);
    });
  });

module.exports = {
  initEventsQueue,
};
