const elasticsearch = require('elasticsearch');

const config = require('../config').get('elasticsearch');
const logger = require('../utils/logger')('elasticsearch');

const client = new elasticsearch.Client({
  host: config.host,
  log: config.log
});

client.ping({
  requestTimeout: 1000
}, (err) => {
  if (err) {
    logger.error(`elasticsearch connection error: ${err}`);
  } else {
    logger.info('Successfully connected to elasticsearch cluster');
  }
});

const createDocument = (id, index, type, body) =>
  client.create({
    id,
    index,
    type,
    body
  });


// createDocument('2', 'event', 'event', {
  // description: 'some description',
  // date: '2018-05-11 12:00',
  // name: 'my event',
// });

module.exports = {
  client,
  createDocument,
};
