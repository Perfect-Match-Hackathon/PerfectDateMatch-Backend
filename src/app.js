/* eslint-disable import/prefer-default-export */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes);

export { app };
