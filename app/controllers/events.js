const { get } = require('lodash');
const uuid = require('uuid');

const elasticSearchClient = require('../services/elasticSearch');

const EventsQueryBuilder = require('../utils/events_query_builder');

const searchEvents = (req, res, next) => elasticSearchClient.search({
  index: 'event',
  type: 'event',
  body: EventsQueryBuilder
    .create(req.query)
    .withName()
    .withDescription()
    .withPagination()
    .build(),
})
  .then(result => get(result, 'hits.hits', []).map(hit => ({
    id: get(hit, '_id'),
    ...get(hit, '_source', {})
  })))
  .then(events => res.json(events))
  .catch(next);

const createEvent = (req, res, next) => {
  const { name, description, date } = req.body;

  return elasticSearchClient.create({
    id: uuid(),
    index: 'event',
    type: 'event',
    body: {
      name,
      description,
      date,
    }
  })
    .then(() => res.sendStatus(201))
    .catch(next);
};

const deleteEvent = (req, res, next) => {
  const { id } = req.params;

  return elasticSearchClient.delete({
    index: 'event',
    type: 'event',
    id
  })
    .then(() => res.sendStatus(202))
    .catch(next);
};

module.exports = {
  searchEvents,
  createEvent,
  deleteEvent,
};
