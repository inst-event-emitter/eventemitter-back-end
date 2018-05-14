const nconf = require('nconf');
const { createTransport } = require('nodemailer');
const { defaultsDeep } = require('lodash');

const logger = require('../utils/logger')('mailer');

const transporter = createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    user: nconf.get('mailer:user'),
    pass: nconf.get('mailer:pass'),
  },
  logger
});

const defaultEmailOptions = {
  from: nconf.get('mailer:from'),
};

const sendEmail = (emailOptions) => {
  const options = defaultsDeep(emailOptions, defaultEmailOptions);

  return transporter.sendMail(options)
    .then((info) => {
      logger.info(`Email with ID: ${info.messageId} was sent`);
    })
    .catch((err) => {
      logger.error('Error occured when send email', err);
    });
};

module.exports = {
  sendEmail
};
