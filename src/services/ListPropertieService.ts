import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Propertie from '../models/Propertie';
import PropertiesRepository from '../repositories/PropertiesRepository';

class ListPropertieService {
  public async listProperties(): Promise<Propertie[] | null> {
    const propertiesRepository = getCustomRepository(PropertiesRepository);

    const properties = await propertiesRepository.find();

    return properties || null;
  }

  public async getById(id: string): Promise<Propertie | null> {
    if (!validate(id)) {
      throw new AppError('Please send a valid id', 400);
    }

    const propertiesRepository = getCustomRepository(PropertiesRepository);

    const propertie = await propertiesRepository.findOne(id);

    if (!propertie) {
      throw new AppError('Propertie not found', 404);
    }

    return propertie || null;
  }

  public async getByUserId(userId: string): Promise<Propertie[] | null> {
    if (!validate(userId)) {
      throw new AppError('Please send a valid id', 400);
    }

    const propertiesRepository = getCustomRepository(PropertiesRepository);

    const properties = await propertiesRepository.find({
      where: { owner_id: userId },
    });

    return properties || null;
  }
}

export default ListPropertieService;
