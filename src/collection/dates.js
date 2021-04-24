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
        const { response } = date.val();
        if (!response || !response[id]) {
          dates[date.key] = date.val();
        }
      });
      // message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`,
      res.json(dates);
    });
};

// eslint-disable-next-line no-unused-vars
const searchDate = (req, res) => {
  // eslint-disable-next-line no-empty
  try {
  } catch (error) {
    res.status(500).send({
      message: `Error searching date ${req.params.id}`,
    });
  }
};

// eslint-disable-next-line no-unused-vars
const createDate = (req, res) => {
  // eslint-disable-next-line no-empty
  try {
  } catch (error) {
    res.status(500).send({
      message: `Error creating date`,
    });
  }
};

const responseDate = (req, res) => {
  try {
    admin
      .database()
      .ref(`/dates/${req.params.id}`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          admin
            .database()
            .ref(`/dates/${req.params.id}/response/${res.locals.user.uid}`)
            .set(req.params.response);
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: `Error replying to date ${req.params.id}`,
    });
  }
};

export { listDates, searchDate, responseDate, createDate };
