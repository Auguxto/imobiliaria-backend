import { EntityRepository, Repository } from 'typeorm';
import Propertie from '../models/Propertie';

@EntityRepository(Propertie)
class PropertiesRepository extends Repository<Propertie> {}

export default PropertiesRepository;
