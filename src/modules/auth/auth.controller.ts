import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ListLogin } from './dto/list-login.dto';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from './interfaces/request-user.interface';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from '../user/enum/type-user.enum';
import { UserSessionDto } from './dto/user-session.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(
    @Body() { email, password }: LoginDto,
  ): Promise<ListLogin> {
    return await this.authService.login(email, password);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get('/session')
  public async getSession(
    @Req() req: RequestUser,
    @Body() userSessionDto: UserSessionDto,
  ) {
    const userId = req.user.sub;

    return await this.authService.getSession(userId, userSessionDto);
  }
}
