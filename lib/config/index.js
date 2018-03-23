const path = require('path');
const nconf = require('nconf');

const defaults = require('./defaults.json');

nconf.use('memory');

const env = process.env.NODE_ENV;

nconf
  .argv()
  .env()
  .file('envConfig', path.join(__dirname, `${env}.json`))
  .defaults(defaults);

module.exports = nconf;
