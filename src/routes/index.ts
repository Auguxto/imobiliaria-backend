import { Router } from 'express';

import usersRouter from './users.router';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
