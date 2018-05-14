const { get } = require('lodash');
const uuid = require('uuid');

const { elasticSearchClient, getTypeAndIndex } = require('../services/elasticSearch');
const { sendEmail } = require('../services/mailer');
const { createTemplate, EVENT_CREATED } = require('../templates');

const EventsQueryBuilder = require('../utils/events_query_builder');

const searchEvents = (req, res, next) => {
  const { index, type } = getTypeAndIndex('event');

  return elasticSearchClient.search({
    index,
    type,
    body: EventsQueryBuilder
      .create(req.query)
      .withName()
      .withDescription()
      .withDateRange()
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
};

const createEvent = (req, res, next) => {
  const { name, description, date } = req.body;
  const { index, type } = getTypeAndIndex('event');

  return elasticSearchClient.create({
    id: uuid(),
    index,
    type,
    body: {
      name,
      description,
      date,
    }
  })
    .then(() => createTemplate(EVENT_CREATED.template))
    .then(template => sendEmail({
      // TODO: use real event owner email
      to: 'krivichaninds@gmail.com',
      subject: EVENT_CREATED.subject,
      html: template,
    }))
    .then(() => res.sendStatus(201))
    .catch(next);
};

const deleteEvent = (req, res, next) => {
  const { id } = req.params;

  const { index, type } = getTypeAndIndex('event');

  return elasticSearchClient.delete({ index, type, id })
    .then(() => res.sendStatus(202))
    .catch(next);
};

module.exports = {
  searchEvents,
  createEvent,
  deleteEvent,
};
