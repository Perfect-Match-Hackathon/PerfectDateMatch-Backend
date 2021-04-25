/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const dateref = admin.database().ref(`/dates`);

const listDates = (req, res) => {
  const { uid } = res.locals.user;
  dateref.once('value', val => {
    const dates = {};
    val.forEach(date => {
      const { response } = date.val();
      if (!response || !response[uid]) {
        const insert = date.val();
        delete insert.response;
        dates[date.key] = insert;
      }
    });
    res.json(dates);
  });
};

const listUserDates = (req, res) => {
  const { uid } = res.locals.user;
  dateref.once('value', val => {
    const dates = {};
    val.forEach(date => {
      const { response } = date.val();
      if (response && response[uid]) {
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
    dateref.child(req.params.id).once('value', val => {
      const date = val.val();
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
      location: null,
      description: null,
      date: null,
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
    const dateidref = dateref.child(req.params.id);
    dateidref.once('value', snapshot => {
      if (snapshot.exists()) {
        dateidref
          .child(`response/${res.locals.user.uid}`)
          // eslint-disable-next-line eqeqeq
          .set(req.params.response == 'true');
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
