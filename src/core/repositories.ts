import { getCustomRepository } from 'typeorm';

import PropertiesRepository from '../repositories/PropertiesRepository';
import UsersRepository from '../repositories/UsersRepository';

export function getUsersRepository() {
  return getCustomRepository(UsersRepository);
}

export function getPropertiesRepository() {
  return getCustomRepository(PropertiesRepository);
}
