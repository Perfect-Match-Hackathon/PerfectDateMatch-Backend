import express from 'express';
import { healthcheck } from '../controllers';
import { listDates, dateSearch } from '../collection';
import { datepopulator } from '../populator';

const firebaseMiddleware = require('express-firebase-middleware');

const routes = express.Router();

routes.use('/healthcheck', firebaseMiddleware.auth);

routes.get('/healthcheck', healthcheck);

routes.use('/collection', firebaseMiddleware.auth);
routes.get('/collection/dates/', listDates);
routes.get('/collection/dates/:id', dateSearch);
routes.get('/collection/populate', datepopulator);

export default routes;
