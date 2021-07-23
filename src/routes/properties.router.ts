import { Router } from 'express';
import multer from 'multer';

import uploadPropertiesPhotos from '../config/uploadPropertiesPhotos';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePropertieService from '../services/CreatePropertieService';
import UpdatePropertiesPhotos from '../services/UpdatePropertiesPhotos';

const upload = multer(uploadPropertiesPhotos);

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

propertiesRouter.patch(
  '/photos',
  ensureAuthenticated,
  upload.array('files'),
  async (request, response) => {
    const { propertie_id } = request.body;

    const updatePropertiesPhotos = new UpdatePropertiesPhotos();

    const photos = request.files.map(photo => photo.filename);

    const propertie = await updatePropertiesPhotos.execute({
      user_id: request.user.id,
      propertie_id,
      photos,
    });

    return response.json(propertie);
  },
);

export default propertiesRouter;
