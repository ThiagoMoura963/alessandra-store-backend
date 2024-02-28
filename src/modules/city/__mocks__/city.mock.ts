import { CityEntity } from '../entities/city.entity';
import { StateEntityMock } from '../../state/__mocks__/state.mock';

export const cityEntityMock: CityEntity = {
  id: 1,
  stateId: StateEntityMock.id,
  name: 'CityName',
  createdAt: new Date(),
  updatedAt: new Date(),
};
