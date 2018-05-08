const { Factory } = require('rosie');
const uuid = require('uuid');

module.exports = Factory.define('event')
  .sequence('id', uuid)
  .sequence('name', index => `Event name ${index}`)
  .sequence('description', index => `Event description ${index}`)
  .attr('date', 1525769503027);
