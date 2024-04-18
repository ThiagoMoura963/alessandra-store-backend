import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ListLogin } from './dto/list-login.dto';
import { UserService } from '../user/user.service';
import { ListUserDto } from '../user/dto/list-user.dto';
import { IAuthService } from './interfaces/auth.interface';
import { UserPayload } from './interfaces/user-payload.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSession } from './interfaces/user-session.interface';
import { UserType } from '../user/enum/type-user.enum';
import { ConfigService } from '@nestjs/config';
import { UserSessionDto } from './dto/user-session.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  public async getSession(
    userId: number,
    userSessionDto: UserSessionDto,
  ): Promise<UserSession> {
    const SECRET_JWT = this.configService.get<string>('SECRET_JWT');

    if (!userSessionDto.jwtToken)
      throw new BadRequestException('O Token não existe');

    await this.jwtService.verify(userSessionDto.jwtToken, {
      secret: SECRET_JWT,
    });
    const decodedToken = await this.jwtService.decode(userSessionDto.jwtToken);

    const user = await this.userService.findUserById(decodedToken.sub);

    return {
      data: {
        user: user.name,
        email: user.email,
      },
      id: user.id,
      roles: user.typeUser === UserType.User ? 'User' : 'Admin',
    };
  }
}
