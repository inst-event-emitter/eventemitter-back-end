import express from 'express';

import errorHandler, { notFound } from '../middleware/error_handler';
import api from '../routes/api';

const app = express();

app.use('/api/v1', api);
app.use('/', notFound);
app.use(errorHandler);

export default app;
