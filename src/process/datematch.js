/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
const AsyncLock = require('async-lock');

const admin = require('firebase-admin');

const lock = new AsyncLock();
const dateref = admin.database().ref(`/dates`);
const datematchref = admin.database().ref(`/datematch`);

const removematch = (updated, date, done) => {
  let remove;
  datematchref.child(`${updated.key}/${date.key}`).transaction(
    current => {
      if (current) {
        remove = current;
        return null;
      }
      return current;
    },
    (error, commited) => {
      if (!error && commited && remove) {
        console.log(`Removed ${updated.key} with ${remove}`);
        datematchref.child(`${remove}/${date.key}`).remove();
      }
      done();
    },
  );
};

const attemptmatch = (updated, date, done) => {
  datematchref.once('value', snapshot => {
    if (!snapshot.hasChild(`${updated.key}/${date.key}`)) {
      let match;
      const { response } = date.val();
      if (response) {
        Object.keys(response).every(value => {
          if (value !== updated.key && response[value]) {
            if (!snapshot.hasChild(`${value}/${date.key}`)) {
              match = value;
              return false;
            }
          }
          return true;
        });
      }
      if (match) {
        console.log(`Matched ${updated.key} with ${match}`);
        datematchref.child(`${updated.key}/${date.key}`).set(match);
        datematchref.child(`${match}/${date.key}`).set(updated.key);
      }
    }
    done();
  });
};

const updatematch = (updated, date) => {
  lock.acquire('update', done => {
    if (updated.val()) {
      console.log(`Attempt ${updated.key}`);
      attemptmatch(updated, date, done);
    } else {
      console.log(`Remove ${updated.key}`);
      removematch(updated, date, done);
    }
  });
};

const datematching = () => {
  dateref.on('value', snapshot => {
    snapshot.forEach(date => {
      const responseref = dateref.child(`${date.key}/response/`);
      responseref.on('child_added', updated => updatematch(updated, date));
    });
  });
};

export { datematching };
