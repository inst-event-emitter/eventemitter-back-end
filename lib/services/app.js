const express = require('express');

const { errorHandler, notFound } = require('../middleware/error_handler');
const api = require('../routes/api');

const app = express();

app.use('/api/v1', api);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
