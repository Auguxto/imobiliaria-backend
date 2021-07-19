import { EntityRepository, FindOneOptions, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser || null;
  }
}

export default UsersRepository;
