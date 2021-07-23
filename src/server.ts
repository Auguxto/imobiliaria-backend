import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';

import './database';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

import upload from './config/upload';
import uploadProperties from './config/uploadPropertiesPhotos';

const app = express();

app.use(express.json());
app.use('/files/avatars', express.static(upload.directory.avatarsFolder));
app.use(
  '/files/properties',
  express.static(uploadProperties.directory.propertiesFolder),
);
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => console.log('Server started on port 3333!'));
