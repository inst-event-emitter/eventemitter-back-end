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

const createDocument = () =>
  client.create({
    index: 'event',
    type: 'event',
    id: '1',
    body: {
      description: 'some description',
      eventDate: '2018-05-11 12:00',
      eventType: 'custom',
      name: 'my event',
    }
  });

// createDocument();

module.exports = {
  client,
  createDocument
};
