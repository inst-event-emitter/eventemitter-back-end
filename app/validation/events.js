const Joi = require('joi');

const eventSchema = {
  body: {
    name: Joi.string().min(5, 'utf-8').max(100, 'utf-8').required(),
    description: Joi.string().min(50, 'utf-8').max(3000, 'utf-8').required(),
    date: Joi.number().min(Date.now()).unit('seconds').required(),
  }
};

module.exports = {
  eventSchema,
};
