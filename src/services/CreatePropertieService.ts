import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Propertie from '../models/Propertie';
import PropertiesRepository from '../repositories/PropertiesRepository';
import UsersRepository from '../repositories/UsersRepository';

/**
 * Obrigatorios (owner_id, type, city, state, price, description)
 */
interface Request {
  owner_id: string;
  bathrooms?: number;
  rooms?: number;
  bedrooms?: number;
  suites?: number;
  propertie_size?: number;
  terrain_size?: number;
  type: string;
  city: string;
  state: string;
  price: number;
  description: string;
  parking_spaces?: number;
  goal: string;
}

class CreatePropertieService {
  public async execute({
    owner_id,
    bathrooms,
    rooms,
    bedrooms,
    suites,
    propertie_size,
    terrain_size,
    type,
    city,
    state,
    price,
    description,
    parking_spaces,
    goal,
  }: Request): Promise<Propertie> {
    const usersRepository = getCustomRepository(UsersRepository);
    const propertiesRepository = getCustomRepository(PropertiesRepository);

    let user = await usersRepository.findOne(owner_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    const propertie = propertiesRepository.create({
      owner_id,
      bathrooms,
      rooms,
      bedrooms,
      suites,
      propertie_size,
      terrain_size,
      type,
      city,
      state,
      price,
      description,
      parking_spaces,
      goal,
    });

    await propertiesRepository.save(propertie);

    return propertie;
  }
}

export default CreatePropertieService;
