const app = require('express')();

const { errorHandler, notFound } = require('../middleware/error_handler');

const config = require('../config');
const initializeRoutes = require('../utils/initialize_routes');

app.use('/api/v1', initializeRoutes(config.get('server:routesFolder')));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
