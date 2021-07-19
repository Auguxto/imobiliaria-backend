import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import auth from '../config/auth';

import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const { secret } = auth.jwt;

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(sub);

    if (!user) {
      throw new AppError('Invalid JWT token', 401);
    }

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
