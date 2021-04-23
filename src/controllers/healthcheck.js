/* eslint-disable import/prefer-default-export */
import logger from '../logger';

const healthcheck = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    logger.error(`Exception Raised in Healthcheck :: ${error.toString()}`);
  }
};

export { healthcheck };
