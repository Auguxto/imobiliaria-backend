import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';
import auth from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    let user = await usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorret email,password combinaiton.', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
