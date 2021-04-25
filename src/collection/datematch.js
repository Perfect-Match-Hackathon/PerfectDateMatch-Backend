/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const datematchref = admin.database().ref(`/datematch`);
const userref = admin.database().ref(`/users`);

const fetchMatch = (req, res) => {
  try {
    datematchref.once('value', snapshot => {
      const { uid } = res.locals.user;
      if (!snapshot.hasChild(`${uid}/${req.params.id}`)) {
        res.status(500).send({
          message: `No match found for ${req.params.id}`,
        });
        return;
      }
      const matchedref = datematchref.child(`${uid}/${req.params.id}`);
      matchedref.once('value', matched => {
        userref.once('value', usersnapshot => {
          if (!usersnapshot.hasChild(`${matched.val()}/socialMedia`)) {
            res.status(500).send({
              message: `Unable to find social match data for ${req.params.id}`,
            });
            return;
          }
          const matchref = userref.child(matched.val());
          matchref.once('value', user => {
            const userData = user.val();
            const info = {
              firstName: null,
              lastName: null,
              socialMedia: null,
            };
            Object.keys(info).forEach(key => {
              info[key] = userData[key];
            });
            res.json(userData);
          });
        });
      });
    });
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving match ${req.params.id}`,
    });
  }
};

export { fetchMatch };
