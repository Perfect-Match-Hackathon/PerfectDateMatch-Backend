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

const createDate = (req, res) => {
  try {
    const date = {
      title: null,
      thumbnail: null,
      people: null,
      location: null,
      description: null,
      date: null,
      authoricon: null,
    };
    Object.keys(date).forEach(key => {
      if (!req.body[key]) {
        throw new Error(`Empty ${key}`);
      }
      date[key] = req.body[key];
    });

    const db = admin.database();
    db.ref('dateid').transaction(
      dateid => {
        return dateid + 1;
      },
      (error, commited, transaction) => {
        if (error) {
          throw error;
        } else if (!commited) {
          throw new Error('Error creating date.');
        } else {
          const newid = transaction.val();
          db.ref(`dates/${newid}`).set(date);
          res.json({ success: true, dateid: newid });
        }
      },
    );
  } catch (error) {
    res.status(500).send({
      message: `${error.message}`,
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
          res.json({ success: false, message: 'Date does not exist.' });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: `Error replying to date ${req.params.id}`,
    });
  }
};

export { listDates, searchDate, responseDate, createDate };
