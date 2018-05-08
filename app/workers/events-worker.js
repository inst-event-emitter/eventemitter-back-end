require('../config');

const logger = require('../utils/logger')('eventsWorker');
const { createWorkerQueue } = require('../utils/redisQueue');

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaughtException');

  process.exit(1);
});


createWorkerQueue('eventsWorker')
  .then(eventsWorker => eventsWorker.process((job, done) => {
    // TODO: Make something with job
    logger.info(`Handle job: ${job.id}`);
    done(null);
  }))
  .catch((error) => {
    logger.error({ error }, 'Events export worker initialization failed');
    process.exit(1);
  });
