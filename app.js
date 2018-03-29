const initializer = require('./app/utils/initializer');
const initilizeGracefulExit = require('./app/utils/initialize_graceful_exit');

const server = require('./app/server');

initializer.appReady()
  .then(server.initApp)
  .then(server.startApp)
  .then(initilizeGracefulExit);
