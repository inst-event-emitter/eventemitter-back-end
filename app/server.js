const app = require('express')();
const nconf = require('nconf');
const globSync = require('glob').sync;
const morgan = require('morgan');

const { errorHandler, notFound } = require('./middleware/error_handler');

const initApp = () => {
  const env = process.env.NODE_ENV || 'dev';
  if (env === 'dev') {
    app.use(morgan('dev'));
  }

  const routes = globSync('./routes/**/*.js', {
    cwd: __dirname,
  }).map(require);

  routes.forEach((route) => {
    route(app, nconf.get('App'));
  });

  app.use(notFound);
  app.use(errorHandler);

  return Promise.resolve();
};

const startApp = () => {
  const port = process.env.PORT || nconf.get('server:port');

  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server listen on port: ${port}`);
    }
  });
};

module.exports = {
  initApp,
  startApp,
};
