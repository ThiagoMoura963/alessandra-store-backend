import { Repository } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { AddressEntity } from './entities/address.entity';
import { CreateAdressDto } from './dto/create-adress.dto';
import { IAdressService } from './interfaces/adress.interface';
import { UpdateAdressDto } from './dto/update-adress.dto';

@Injectable()
export class AddressService implements IAdressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly adressRepository: Repository<AddressEntity>,

    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}
  async createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAdressDto.cityId);

    const adressEntity = new AddressEntity();

    Object.assign(adressEntity, createAdressDto as AddressEntity);
    adressEntity.userId = userId;

    return await this.adressRepository.save(adressEntity);
  }

  public async updateAdress(
    userId: number,
    adressId: number,
    updatedAdressDto: UpdateAdressDto,
  ): Promise<AddressEntity> {
    const adress = await this.adressRepository.findOne({
      where: { id: adressId },
      relations: {
        user: true,
      },
    });
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(updatedAdressDto.cityId!);

    if (adress?.user?.id !== userId)
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse endereço',
      );

    Object.assign(adress, updatedAdressDto as AddressEntity);

    return this.adressRepository.save(adress);
  }

  public async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.adressRepository.find({
      where: { userId },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!addresses || !addresses.length)
      throw new NotFoundException(
        `Os endereços do usuário de id ${userId} não foram encontrados`,
      );

    return addresses;
  }
}
