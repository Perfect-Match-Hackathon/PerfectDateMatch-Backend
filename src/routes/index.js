import express from 'express';
import { healthcheck } from '../controllers';

const routes = express.Router();

routes.get('/healthcheck', healthcheck);

export default routes;
