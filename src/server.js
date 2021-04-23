/* eslint-disable import/first */

// eslint-disable-next-line no-console
console.log(`Express Application listening on port ${process.env.PORT}`);

import './bootstrap';
import app from './app';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Application listening on port ${process.env.PORT}`);
});
