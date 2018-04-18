const router = require('express').Router();
const bodyParser = require('body-parser');

const { searchEvents, createEvent, deleteEvent } = require('../controllers/events');

module.exports = (app, conf) => {
  router.get('/events', searchEvents);
  router.post('/events/create', bodyParser.json(), createEvent);
  router.delete('/events/delete/:id', deleteEvent);

  app.use(conf.namespace + conf.version, router);
};
