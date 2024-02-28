import { AddressEntity } from '../entities/address.entity';
import { CreateAdressDto } from '../dto/create-adress.dto';
import { UpdateAdressDto } from '../dto/update-adress.dto';

export interface IAdressService {
  createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AddressEntity>;

  updateAdress(
    userId: number,
    adressId: number,
    updatedAdressDto: UpdateAdressDto,
  ): Promise<AddressEntity>;

  findAddressByUserId(userId: number): Promise<AddressEntity[]>;
}
