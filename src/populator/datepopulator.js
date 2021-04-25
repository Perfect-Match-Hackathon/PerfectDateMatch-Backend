/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const datePopulator = () => {
  const dates = {
    0: {
      title: 'Avatar',
      thumbnail: 'https://www.indiewire.com/wp-content/uploads/2019/03/shutterstock_5885988bd.jpg',
      location: 'North America',
      description: 'Watch the latest Avatar movie in cinemas with someone new.',
      date: 0,
    },
    1: {
      title: 'This thumbnail lol',
      thumbnail:
        'https://specials-images.forbesimg.com/imageserve/5f3686cb821ad8a56911e85d/960x0.jpg?fit=scale',
      location: 'West Auckland',
      description: 'Pog event',
      date: 0,
    },
  };

  try {
    const db = admin.database();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(dates)) {
      db.ref(`dates/${key}`).set(value);
    }
  } catch (error) {
    // Do nothing
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export { datePopulator };
