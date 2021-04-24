/* eslint-disable import/prefer-default-export */
import express from 'express';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes);

export { app };
