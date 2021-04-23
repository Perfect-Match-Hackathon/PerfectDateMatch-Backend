import './bootstrap';
import app from './app';
import logger from './logger';

app.listen(process.env.APP_PORT, () => {
  logger.info(`Express Application listening on port ${process.env.APP_PORT}`);
});
