const router = require('express').Router();
const bodyParser = require('body-parser');

const { searchEvents, createEvent } = require('../controllers/events');

module.exports = (app, conf) => {
  router.get('/events', searchEvents);
  router.post('/events/create', bodyParser.json({ limit: '50mb' }), createEvent);

  app.use(conf.namespace + conf.version, router);
};
