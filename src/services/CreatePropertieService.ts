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
  address: string;
  number: string;
  bathrooms: number;
  rooms: number;
  bedrooms: number;
  suites: number;
  propertie_size: number;
  terrain_size: number;
  type: string;
  city: string;
  state: string;
  price: number;
  description: string;
  parking_spaces: number;
  goal: string;
}

class CreatePropertieService {
  public async execute({
    owner_id,
    address,
    number,
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
      address,
      number,
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

    user.properties = [...user.properties, propertie.id];

    await usersRepository.save(user);

    return propertie;
  }

  public async list(): Promise<Propertie[] | null> {
    const propertiesRepository = getCustomRepository(PropertiesRepository);
    const properties = await propertiesRepository.find({
      relations: ['user'],
    });

    return properties || null;
  }
}

export default CreatePropertieService;
