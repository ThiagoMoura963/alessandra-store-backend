import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { HashPasswordPiPe } from 'src/resources/pipes/hash-passoword.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPiPe) passowrdHashed: string,
  ): Promise<{ user: UserEntity; message: string }> {
    const createdUser = await this.userService.createUser({
      ...createUserDto,
      password: passowrdHashed,
    });

    return {
      user: createdUser,
      message: 'usuário cadastrado com sucesso',
    };
  }

  @Get()
  public async getAllUsers(): Promise<ListUserDto[]> {
    const users = await this.userService.getAllUsers();
    const listedUsers = users.map((user) => new ListUserDto(user));

    return listedUsers;
  }

  @Get('/:userId')
  public async getUserByIdUsingRelations(
    @Param('userId') userId: number,
  ): Promise<ListUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);
    const listedUser = new ListUserDto(user);

    return listedUser;
  }
}
