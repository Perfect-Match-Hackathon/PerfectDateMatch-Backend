import datePopulator from './populator/datepopulator';

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE,
});

admin
  .database()
  .ref()
  .on('value', snapshot => {
    if (!snapshot.hasChild('dates')) {
      datePopulator();
    }
  });
