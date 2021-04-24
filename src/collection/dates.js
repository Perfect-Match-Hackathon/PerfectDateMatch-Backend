/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const listDates = (req, res) => {
  admin
    .database()
    .ref('/dates')
    .on('value', val => {
      const id = res.locals.user.uid;

      const dates = {};
      val.forEach(date => {
        const { response } = date.val();
        if (!response || !response[id]) {
          const insert = date.val();
          delete insert.response;
          dates[date.key] = insert;
        }
      });
      res.json(dates);
    });
};

const listUserDates = (req, res) => {
  const id = res.locals.user.uid;
  admin
    .database()
    .ref('/dates')
    .on('value', val => {
      const dates = {};
      val.forEach(date => {
        const { response } = date.val();
        if (response && response[id]) {
          const insert = date.val();
          delete insert.response;
          dates[date.key] = insert;
        }
      });
      res.json(dates);
    });
};

const selectDate = (req, res) => {
  try {
    admin
      .database()
      .ref(`/dates/${req.params.id}/`)
      .on('value', val => {
        const date = val.val();
        console.log(req.params.id);
        if (date) {
          delete date.response;
          res.json(date);
        } else {
          res.json({});
        }
      });
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving date ${req.params.id}`,
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
      message: `Error responding to date ${req.params.id}`,
    });
  }
};

export { listDates, listUserDates, selectDate, responseDate, createDate };
