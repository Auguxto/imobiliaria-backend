import { hash } from 'bcryptjs';
import { getUsersRepository } from '../core/repositories';

import AppError from '../errors/AppError';
import User from '../models/User';

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
    const usersRepository = getUsersRepository();

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
