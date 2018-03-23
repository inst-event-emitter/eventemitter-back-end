const router = require('express').Router();

module.exports = (app, conf) => {
  router.get('/', (req, res) => res.send('Hello world message'));
  router.get('/exclamation', (req, res) => res.send('Hello world with exclamations!!!'));
  app.use(conf.namespace + conf.version, router);
};
