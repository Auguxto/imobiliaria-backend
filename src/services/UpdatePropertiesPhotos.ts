import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import PropertiesRepository from '../repositories/PropertiesRepository';
import UsersRepository from '../repositories/UsersRepository';
import uploadPropertiesPhotos from '../config/uploadPropertiesPhotos';
import Propertie from '../models/Propertie';

interface Request {
  user_id: string;
  propertie_id: string;
  photos: string[];
}

class UpdatePropertiesPhotos {
  public async execute({
    user_id,
    propertie_id,
    photos,
  }: Request): Promise<Propertie> {
    const usersRepository = getCustomRepository(UsersRepository);
    const propertiesRepository = getCustomRepository(PropertiesRepository);

    const user = await usersRepository.findOne(user_id);
    const propertie = await propertiesRepository.findOne(propertie_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change properties photos',
        401,
      );
    }

    if (!propertie) {
      throw new AppError('Propertie not found', 400);
    }

    if (user_id !== propertie.owner_id) {
      throw new AppError('You are not the owner of this property', 401);
    }

    if (propertie.photos) {
      for (let i = 0; propertie.photos.length >= 0; i++) {
        try {
          await fs.promises.unlink(
            path.join(
              uploadPropertiesPhotos.directory.propertiesFolder,
              propertie.photos[i],
            ),
          );
        } catch {}
      }
    }

    propertie.photos = [...photos];

    await propertiesRepository.save(propertie);

    return propertie;
  }
}

export default UpdatePropertiesPhotos;
