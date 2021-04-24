/* eslint-disable import/prefer-default-export */
const admin = require('firebase-admin');

const datePopulator = (req, res) => {
  const dates = {
    0: {
      title: 'Avatar',
      thumbnail: '',
      authorIcon: '',
      location: 'Auckland',
      description: 'Watch the latest Avatar movie in cinemas with someone new.',
      date: 0,
      people: [1, 2],
      replies: { rljXLgHrmJeO6QHuy5cLLHFLHkq2: true },
    },
    1: {
      title: 'Central Park Walk',
      thumbnail: '',
      authorIcon: '',
      location: 'New York',
      description: 'Enjoy an evening stroll around Central Park.',
      date: 0,
      people: [1, 2],
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
  res.json({});
};

export { datePopulator };
