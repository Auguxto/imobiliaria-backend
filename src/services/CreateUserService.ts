import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  telephone: string;
  state: string;
  city: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    telephone,
    state,
    city,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const checkUserExists = await usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      telephone,
      state,
      city,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
