const { Factory } = require('rosie');
const uuid = require('uuid');

module.exports = Factory.define('event')
  .sequence('id', uuid)
  .sequence('name', index => `Event name ${index}`)
  .sequence('description', index => `Event description ${index}`)
  .attr('date', '2018-06-03 12:00');
