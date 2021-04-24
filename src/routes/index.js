import express from 'express';
import { listDates, listUserDates, searchDate, responseDate, createDate } from '../collection';

const firebaseMiddleware = require('express-firebase-middleware');

const routes = express.Router();

// Rquire authentication for all collection endpoints
routes.use('/collection', firebaseMiddleware.auth);
// List all available dates
routes.get('/collection/dates/', listDates);
// List a users accepted dates
routes.get('/collection/dates/list/', listUserDates);
// Search for a date by DateID
routes.get('/collection/dates/:id', searchDate);

// Respond true/false to a date
routes.post('/collection/dates/response/:id/:response', responseDate);
// Create a new date with parameters
routes.post('/collection/dates/create', createDate);

export default routes;
