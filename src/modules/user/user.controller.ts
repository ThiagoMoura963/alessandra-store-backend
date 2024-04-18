import { UserService } from './user.service';
import { UserType } from './enum/type-user.enum';
import { ListUserDto } from './dto/list-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { RequestUser } from '../auth/interfaces/request-user.interface';
import { HashPasswordPiPe } from 'src/resources/pipes/hash-passoword.pipe';
import { Controller, Get, Post, Body, Param, Patch, Req } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPiPe) passwordHashed: string,
  ): Promise<{ user: UserEntity; message: string }> {
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: passwordHashed,
    });

    return {
      user: newUser,
      message: 'usuário cadastrado com sucesso',
    };
  }

  @Roles(UserType.Admin)
  @Get()
  public async getAllUsers(): Promise<ListUserDto[]> {
    const users = await this.userService.getAllUsers();
    const listedUsers = users.map((user) => new ListUserDto(user));

    return listedUsers;
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  public async getUserByIdUsingRelations(
    @Param('userId') userId: number,
  ): Promise<ListUserDto> {
    const user = await this.userService.getUserByIdUsingRelations(userId);
    const userListed = new ListUserDto(user);

    return userListed;
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  public async updateUserPassword(
    @Req() req: RequestUser,
    @Body('newPassword', HashPasswordPiPe) newPasswordHashed: string,
    @Body() updatedPasswordDto: UpdatePasswordDto,
  ): Promise<{ user: UserEntity; message: string }> {
    const userId = req.user.sub;

    const userUpdated = await this.userService.updatePasswordUser(userId, {
      ...updatedPasswordDto,
      newPassword: newPasswordHashed,
    });

    const transformedUser = plainToClass(UserEntity, userUpdated);

    return {
      user: transformedUser,
      message: 'senha atualizada com sucesso',
    };
  }
}
