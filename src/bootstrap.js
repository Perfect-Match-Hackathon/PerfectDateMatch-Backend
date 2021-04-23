import dotenv from 'dotenv';

(async () => {
  await dotenv.config();
  process.env.APPLICATION_ENV = process.env.APPLICATION_ENV || 'prod';
  process.env.PORT = process.env.PORT || 3000;
})();
