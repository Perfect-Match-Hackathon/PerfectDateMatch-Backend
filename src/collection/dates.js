/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const listDates = (req, res) => {
  admin
    .database()
    .ref('/dates/')
    .on('value', val => {
      const id = res.locals.user.uid;
      let filter = val.val();
      filter = filter.filter(i => {
        const { replies } = i;
        return !replies || !replies[id];
      });
      res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`,
        test: `${JSON.stringify(filter)}`,
      });
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
