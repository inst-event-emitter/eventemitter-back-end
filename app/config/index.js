const path = require('path');
const nconf = require('nconf');
const dotenv = require('dotenv');

const defaults = require('./defaults.json');

dotenv.config();
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

nconf.set('mailer:user', process.env.EMAIL_USER);
nconf.set('mailer:pass', process.env.EMAIL_PASS);
