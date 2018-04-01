const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const { get } = require('lodash');

const Logger = require('./base_logger');

const config = require('../config').get('logger');

const env = process.env.NODE_ENV || 'dev';

const loggerOptions = {
  name: config.name || 'event-emitter',
  streams: [
    { level: 'error', stream: process.stderr },
    ...get(config, 'streams', []),
  ],
  serializers: bunyan.stdSerializers,
};

if (env === 'dev') {
  const prettyStream = new PrettyStream();
  prettyStream.pipe(process.stdout);

  loggerOptions.streams.push({
    level: 'info',
    stream: prettyStream,
  });
}

const rootLogger = new Logger(bunyan.createLogger(loggerOptions));

module.exports = rootLogger;
