const nconf = require('nconf');
const Email = require('email-templates');

const emailTemplate = new Email({
  views: {
    root: nconf.get('mailer:templatesDir'),
    options: {
      extension: 'hbs'
    }
  }
});

const createTemplate = (templateName, context = {}) => emailTemplate.render(templateName, context);

const EVENT_CREATED = {
  template: 'eventCreated',
  subject: 'Event Emitter Service - Event Creation',
};

module.exports = {
  createTemplate,
  EVENT_CREATED,
};
