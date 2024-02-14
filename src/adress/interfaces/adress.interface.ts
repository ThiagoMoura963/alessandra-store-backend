import { AdressEntity } from '../entities/adress.entity';
import { CreateAdressDto } from '../dto/create-adress.dto';

export interface IAdressService {
  createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AdressEntity>;
}
