import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { IAuthService } from './interfaces/auth.interface';
import { UserPayload } from './interfaces/user-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ListLogin } from './dto/list-login.dto';
import { ListUserDto } from '../user/dto/list-user.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(email: string, password: string): Promise<ListLogin> {
    const user = await this.userService.findUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('E-mail ou senha inválidos');

    const payload: UserPayload = {
      sub: user.id,
      typeUser: user.typeUser,
    };

    const token = this.jwtService.sign(payload);

    return {
      user: new ListUserDto(user),
      accessToken: token,
    };
  }
}
