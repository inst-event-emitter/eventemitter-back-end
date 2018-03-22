import express from 'express';

import errorHandler, { notFound } from '../middleware/error_handler';
import apiv1 from '../routes/api.v1';

const app = express();

app.use('/api/v1', apiv1);
app.use('/', notFound);
app.use(errorHandler);

export default app;
