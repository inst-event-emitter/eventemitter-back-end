const path = require('path');
const nconf = require('nconf');

const defaults = require('./defaults.json');

nconf.use('memory');

const env = process.env.NODE_ENV || 'dev';
if (!env) {
  throw new Error('Please specify NODE_ENV environment variable');
}

nconf
  .argv()
  .env()
  .file('envConfig', path.join(__dirname, `${env}.json`))
  .defaults(defaults);

module.exports = nconf;
