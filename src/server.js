import './bootstrap';
import app from './app';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express Application listening on port ${process.env.APP_PORT}`);
});
