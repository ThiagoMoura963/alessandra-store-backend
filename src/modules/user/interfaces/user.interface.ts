import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

export interface IUserService {
  getAllUsers(): Promise<UserEntity[]>;
  getUserByIdUsingRelations(id: number): Promise<UserEntity>;
  createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
  findUserById(userId: number): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserEntity>;
  updatePasswordUser(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity>;
}
