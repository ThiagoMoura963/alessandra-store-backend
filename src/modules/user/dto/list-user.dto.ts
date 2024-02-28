import { UserEntity } from '../entities/user.entity';
import { ListAdressDto } from '../../address/dto/list-adress.dto';

export class ListUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  adress?: ListAdressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;

    this.adress = userEntity.address
      ? userEntity.address.map((adress) => new ListAdressDto(adress))
      : undefined;
  }
}
