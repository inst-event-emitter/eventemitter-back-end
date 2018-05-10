const logger = require('../utils/logger')('eventsService');
const { createQueue } = require('../utils/redisQueue');

let eventsQueue;

const initEventsQueue = () => createQueue('eventsQueue')
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
