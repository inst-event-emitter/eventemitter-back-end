require('../config/index');

const loggerInitialization = () => Promise.resolve();

// init logger, db connection etc.
module.exports.appReady = () => Promise.all([
  // dbConnection, connect to storage
  loggerInitialization(),
]);