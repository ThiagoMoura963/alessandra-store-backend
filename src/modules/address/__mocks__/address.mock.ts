import { AddressEntity } from '../entities/address.entity';
import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressEntityMock: AddressEntity = {
  id: 1,
  userId: userEntityMock.id,
  cityId: cityEntityMock.id,
  cep: '123123',
  complement: 'Complement',
  number: 134,
  createdAt: new Date(),
  updatedAt: new Date(),
};
