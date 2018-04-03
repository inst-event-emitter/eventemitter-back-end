const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const fs = require('fs');
const { get } = require('lodash');

const Logger = require('./base_logger');

const config = require('../config').get('logger');

const env = process.env.NODE_ENV || 'dev';

const streams = [
  { level: 'error', stream: process.stderr },
  ...get(config, 'streams', []),
];

if (env === 'dev') {
  const prettyStream = new PrettyStream();
  prettyStream.pipe(process.stdout);

  streams.push({
    level: 'info',
    stream: prettyStream,
  });
}

const logsDir = get(config, 'logsDir', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const rootLogger = new Logger(bunyan.createLogger({
  name: config.name || 'event-emitter',
  streams: streams.map((stream) => {
    if (stream.path) {
      return {
        ...stream,
        path: `${logsDir}/${stream.path}`,
      };
    }

    return stream;
  }),
  serializers: bunyan.stdSerializers,
}));

process.once('SIGUSR2', () => {
  rootLogger.reopenFileStreams();
});

module.exports = rootLogger;
