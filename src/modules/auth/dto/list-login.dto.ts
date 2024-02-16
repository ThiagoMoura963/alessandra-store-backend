import { ListUserDto } from 'src/modules/user/dto/list-user.dto';

export interface ListLogin {
  user: ListUserDto;
  accessToken: string;
}
