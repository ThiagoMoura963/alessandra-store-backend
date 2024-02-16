import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ListLogin } from './dto/list-login.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(
    @Body() { email, password }: LoginDto,
  ): Promise<ListLogin> {
    return await this.authService.login(email, password);
  }
}
