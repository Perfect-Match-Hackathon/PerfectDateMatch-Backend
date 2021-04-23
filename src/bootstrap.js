import dotenv from 'dotenv';

(async () => {
  await dotenv.config();
  process.env.APPLICATION_ENV = process.env.APPLICATION_ENV || 'prod';
  process.env.APP_PORT = process.env.APP_PORT || 3000;
})();
