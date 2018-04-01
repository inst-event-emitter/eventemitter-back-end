const config = require('../config').get('logger');
const logger = require('../services/logger');

module.exports = () => {
  process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');

    if (config.rotationEnabled) {
      logger.reopenFileStreams();
    }
  });
};
