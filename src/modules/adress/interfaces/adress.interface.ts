import { AdressEntity } from '../entities/adress.entity';
import { CreateAdressDto } from '../dto/create-adress.dto';
import { UpdateAdressDto } from '../dto/update-adress.dto';

export interface IAdressService {
  createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AdressEntity>;

  updateAdress(
    userId: number,
    adressId: number,
    updatedAdressDto: UpdateAdressDto,
  ): Promise<AdressEntity>;
}
