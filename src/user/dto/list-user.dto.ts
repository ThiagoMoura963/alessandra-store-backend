import { ListAdressDto } from 'src/adress/dto/list-adress.dto';
import { UserEntity } from '../entities/user.entity';

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

    this.adress = userEntity.adress
      ? userEntity.adress.map((adress) => new ListAdressDto(adress))
      : undefined;
  }
}
