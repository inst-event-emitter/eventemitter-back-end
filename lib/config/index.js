import path from 'path';
import nconf from 'nconf';

import defaults from './defaults.json';

nconf.use('memory');

const env = process.env.NODE_ENV;

nconf
  .argv()
  .env()
  .file('envConfig', path.join(__dirname, `${env}.json`))
  .defaults(defaults);

export default nconf;
