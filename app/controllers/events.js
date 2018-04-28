const { get, isEmpty } = require('lodash');
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
  .then(result => res.json({
    events: get(result, 'hits.hits', []).map(hit => ({
      id: get(hit, '_id'),
      ...get(hit, '_source', {})
    })),
    total: get(result, 'hits.total')
  }))
  .catch(next);

const createEvent = (req, res, next) => {
  // TODO: create validation for route params
  if (isEmpty(req.body)) {
    return res.sendStatus(400);
  }

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
  // TODO: create validation for route params
  const { id } = req.params;

  if (isEmpty(id)) {
    return res.sendStatus(400);
  }

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
