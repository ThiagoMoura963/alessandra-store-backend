import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { IAuthService } from './interfaces/auth.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService) {}

  public async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);
    const isMatch = await bcrypt.compare(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMatch)
      throw new UnauthorizedException('E-mail ou senha inválidos');

    return user;
  }
}
