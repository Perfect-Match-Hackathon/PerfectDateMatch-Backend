/* eslint-disable import/first */

import './bootstrap';

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE,
});

const datematch = require('./process/datematch');

const app = require('./app');

app.app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Application listening on port ${process.env.PORT}`);
});

datematch.datematching();
