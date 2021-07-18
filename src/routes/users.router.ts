import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, telephone, state, city } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    telephone,
    state,
    city,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
