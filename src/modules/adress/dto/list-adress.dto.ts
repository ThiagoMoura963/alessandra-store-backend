import { AdressEntity } from '../entities/adress.entity';
import { ListCityDto } from '../../city/dto/list-city.dto';

export class ListAdressDto {
  cep: string;
  number: number;
  complement: string;
  city?: ListCityDto;

  constructor(adressEntity: AdressEntity) {
    this.cep = adressEntity.cep;
    this.number = adressEntity.number;
    this.complement = adressEntity.complement;
    this.city = adressEntity.city
      ? new ListCityDto(adressEntity.city)
      : undefined;
  }
}
