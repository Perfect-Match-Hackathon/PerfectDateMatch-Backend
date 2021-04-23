import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import logger from './logger';

const app = express();
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use('/', routes);

export default app;
