/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const listDates = (req, res) => {
  admin
    .database()
    .ref('/dates/')
    .on('value', val => {
      const id = res.locals.user.uid;

      const dates = {};
      val.forEach(date => {
        const { replies } = date.val();
        if (!replies || !replies[id]) {
          dates[date.key] = date.val();
        }
      });
      // message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`,
      res.json(dates);
    });
};

// eslint-disable-next-line no-unused-vars
const dateSearch = (req, res) => {
  // eslint-disable-next-line no-empty
  try {
  } catch (error) {
    // Do nothing
  }
};

export { listDates, dateSearch };
