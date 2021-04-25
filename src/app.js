/* eslint-disable import/prefer-default-export */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { swaggerUi, swaggerDocument, swaggerOptions } from './swagger';

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded());

app.use('/', routes);
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

export { app };
