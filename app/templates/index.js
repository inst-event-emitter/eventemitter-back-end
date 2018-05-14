const pug = require('pug');

const EVENT_CREATED = {
  subject: 'Event Emitter Service - Event Creation',
  template: pug.compileFile('./eventCreated.pug')
};

module.exports = {
  EVENT_CREATED,
};
