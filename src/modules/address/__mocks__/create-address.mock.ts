import { CreateAdressDto } from '../dto/create-adress.dto';
import { addressEntityMock } from './address.mock';

export const createAdressMock: CreateAdressDto = {
  cityId: 1,
  cep: addressEntityMock.cep,
  number: addressEntityMock.number,
  complement: addressEntityMock.complement,
};
