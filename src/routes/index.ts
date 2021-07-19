import { Router } from 'express';

import usersRouter from './users.router';
import sessionsRouter from './sessions.router';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
