/* eslint-disable import/prefer-default-export */

const healthcheck = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    // Do nothing
  }
};

export { healthcheck };
