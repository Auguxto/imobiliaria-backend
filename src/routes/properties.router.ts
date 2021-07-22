import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePropertieService from '../services/CreatePropertieService';

const propertiesRouter = Router();

propertiesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    city,
    address,
    number,
    state,
    price,
    description,
    goal,
    type,
    bathrooms,
    bedrooms,
    suites,
    parking_spaces,
    terrain_size,
    propertie_size,
    rooms,
  } = request.body;
  const createPropertie = new CreatePropertieService();

  const propertie = await createPropertie.execute({
    owner_id: request.user.id,
    address,
    number,
    city,
    state,
    price,
    description,
    goal,
    type,
    bathrooms,
    bedrooms,
    suites,
    parking_spaces,
    terrain_size,
    propertie_size,
    rooms,
  });

  return response.json(propertie);
});

export default propertiesRouter;
