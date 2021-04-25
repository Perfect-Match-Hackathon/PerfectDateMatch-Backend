/* eslint-disable import/first */

import './bootstrap';
import './fire';

const datematch = require('./process/datematch');
const app = require('./app');

app.app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Application listening on port ${process.env.PORT}`);
});

datematch.datematching();
