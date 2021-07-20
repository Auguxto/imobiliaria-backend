import { Router } from 'express';

import usersRouter from './users.router';
import sessionsRouter from './sessions.router';
import propertiesRouter from './properties.router';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/properties', propertiesRouter);

export default routes;
