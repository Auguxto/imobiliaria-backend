import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Propertie from '../models/Propertie';
import PropertiesRepository from '../repositories/PropertiesRepository';

type obj = {
  [key: string]: any;
};

class ListPropertieService {
  public async getFilteredProperties(
    filtersQuery: any,
  ): Promise<Propertie[] | null> {
    let filterString;
    try {
      filterString = filtersQuery.toString();
    } catch (err) {
      throw new AppError('Please provide filters', 400);
    }

    const propertiesRepository = getCustomRepository(PropertiesRepository);

    let filters = filterString.split(';');
    if (filters[0] === '') {
      throw new AppError('Please provide filters', 400);
    }

    let filterOptions: obj = {};
    for (let i = 0; i < filters.length; i++) {
      let value = filters[i].split(':');
      filterOptions[value[0]] = isNaN(Number(value[1]))
        ? value[1]
        : Number(value[1]);
    }

    const price = filterOptions.price;

    delete filterOptions.price;

    const properties = await propertiesRepository.find({
      where: filterOptions,
    });

    if (price) {
      const filtered = properties.filter(propertie => propertie.price <= price);

      return filtered;
    }

    return properties || null;
  }
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
