const router = require('express').Router();
const bodyParser = require('body-parser');
const validate = require('express-validation');

const { searchEvents, createEvent, deleteEvent } = require('../controllers/events');
const { createEventSchema } = require('../validation/events');

module.exports = (app, conf) => {
  router.get('/events', searchEvents);
  router.post('/events', validate(createEventSchema), bodyParser.json(), createEvent);
  router.delete('/events/:id', deleteEvent);

  app.use(conf.namespace + conf.version, router);
};
