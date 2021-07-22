import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

import AppError from '../errors/AppError';

const propertiesFolder = path.join(__dirname, '..', '..', 'tmp', 'properties');

const tmpFolder = {
  propertiesFolder,
};

export default {
  directory: tmpFolder,
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/jpe', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError('Invalid image type', 415));
    }
  },
  storage: multer.diskStorage({
    destination: tmpFolder.propertiesFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename.replace(/\s/g, ''));
    },
  }),
};
