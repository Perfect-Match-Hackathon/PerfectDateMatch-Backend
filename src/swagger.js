import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const swaggerOptions = {
  customSiteTitle: 'Perfect Match Date API',
  customfavIcon: '/assets/favicon.ico',
};

export { swaggerUi, swaggerDocument, swaggerOptions };
