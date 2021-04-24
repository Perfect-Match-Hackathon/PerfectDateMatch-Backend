import express from 'express';
import { healthcheck } from '../controllers';

const firebaseMiddleware = require('express-firebase-middleware');

const routes = express.Router();

routes.use('/healthcheck', firebaseMiddleware.auth);

routes.get('/healthcheck', healthcheck);

export default routes;
