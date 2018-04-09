const bodybuilder = require('bodybuilder');
const { get } = require('lodash');

const { client } = require('../services/elasticsearch');

const searchEvents = (req, res, next) => client.search({
  index: 'event',
  type: 'event',
  body: bodybuilder()
    .query('match_all')
    // .query('match', 'name', 'my event')
    .build()
})
  .then(result => get(result, 'hits.hits', []).map(hit => get(hit, '_source', {})))
  .then(events => res.json(events))
  .catch(next);

module.exports = {
  searchEvents,
};
