import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<UserEntity>;
}
