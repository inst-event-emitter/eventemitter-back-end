const router = require('express').Router();

const { searchEvents } = require('../controllers/events');

module.exports = (app, conf) => {
  router.get('/events', searchEvents);
  app.use(conf.namespace + conf.version, router);
};
