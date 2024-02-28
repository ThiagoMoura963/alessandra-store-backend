// import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  getAllUsers(): Promise<UserEntity[]>;
  getUserByIdUsingRelations(id: number): Promise<UserEntity>;
  createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
  findUserById(userId: number): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserEntity>;
}
