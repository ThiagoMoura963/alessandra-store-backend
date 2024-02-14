import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async hashPassword(createUserDto: CreateUserDto): Promise<string> {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(createUserDto);

    const userEntity = new UserEntity();

    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = hashedPassword;
    userEntity.phone = createUserDto.phone;
    userEntity.cpf = createUserDto.cpf;
    userEntity.typeUser = 1;

    return this.userRepository.save(userEntity);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: {
        adress: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  public async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        adress: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user)
      throw new NotFoundException(`O id ${userId} do usuário não existe`);

    return user;
  }

  public async findByUserId(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user)
      throw new NotFoundException(`O id ${userId} do usuário não existe`);

    return user;
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user)
      throw new NotFoundException(`O email ${email} do usuário não existe`);

    return user;
  }
}
