import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserService } from './interfaces/user.interface';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user)
      throw new BadGatewayException(`O email ${createUserDto.email} já existe`);

    const userEntity = new UserEntity();

    Object.assign(userEntity, createUserDto as UserEntity);
    userEntity.typeUser = 1;

    return this.userRepository.save(userEntity);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: {
        address: {
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
        address: {
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

  public async findUserById(userId: number): Promise<UserEntity> {
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
