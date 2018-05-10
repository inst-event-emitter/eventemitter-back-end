require('../config');

const logger = require('../utils/logger')('eventsWorker');
const { createQueue } = require('../utils/redisQueue');

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaughtException');

  process.exit(1);
});


createQueue('eventsWorker', {
  isWorker: true,
  removeOnSuccess: true,
})
  .then(eventsWorker => eventsWorker.process((job, done) => {
    // TODO: Make something with job
    logger.info(`Handle job: ${job.id}`);
    done(null);
  }))
  .catch((error) => {
    logger.error({ error }, 'Events export worker initialization failed');
    process.exit(1);
  });
