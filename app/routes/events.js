const router = require('express').Router();
const bodyParser = require('body-parser');

const { searchEvents, createEvent, deleteEvent } = require('../controllers/events');

module.exports = (app, conf) => {
  router.get('/events', searchEvents);
  router.post('/events', bodyParser.json(), createEvent);
  router.delete('/events/:id', deleteEvent);

  app.use(conf.namespace + conf.version, router);
};
