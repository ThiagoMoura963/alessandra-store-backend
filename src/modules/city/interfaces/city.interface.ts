import { CityEntity } from '../entities/city.entity';

export interface ICityService {
  getAllCities(): Promise<CityEntity[]>;
  getAllCitiesByStateId(stateId: number): Promise<CityEntity[]>;
  findCityById(cityId: number): Promise<CityEntity>;
}
