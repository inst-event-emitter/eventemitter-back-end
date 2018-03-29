const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const { get } = require('lodash');

const Logger = require('./base_logger');

const pkg = require('../../package.json');
const config = require('../config').get('logger');

const env = process.env.NODE_ENV || 'dev';

const loggerOptions = {
  name: config.name || pkg.name,
  streams: [
    { level: 'error', stream: process.stderr },
    { level: 'error', path: 'logs/error.log' },
    ...get(config, 'streams', [])
  ],
  serializers: bunyan.stdSerializers,
};

if (config.rotationEnabled) {
  loggerOptions.streams.push({
    type: 'rotating-file',
    path: `logs/${env}.log`,
    period: '1d',
    count: 7
  });
}

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
