import express from 'express';
import { listDates, searchDate, responseDate, createDate } from '../collection';

const firebaseMiddleware = require('express-firebase-middleware');

const routes = express.Router();

routes.use('/collection', firebaseMiddleware.auth);
routes.get('/collection/dates/', listDates);
routes.get('/collection/dates/:id', searchDate);
routes.get('/collection/dates/response/:id/:response', responseDate);

routes.post('/collection/dates/create', createDate);

export default routes;
