require('../config');
require('../services/elasticSearch');

const loggerInitialization = () => Promise.resolve();

// init logger, db connection etc.
module.exports.appReady = () => Promise.all([
  // dbConnection, connect to storage
  loggerInitialization(),
]);
