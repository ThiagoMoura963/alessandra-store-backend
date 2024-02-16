import { Repository } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { AdressEntity } from './entities/adress.entity';
import { CreateAdressDto } from './dto/create-adress.dto';
import { IAdressService } from './interfaces/adress.interface';
import { UpdateAdressDto } from './dto/update-adress.dto';

@Injectable()
export class AdressService implements IAdressService {
  constructor(
    @InjectRepository(AdressEntity)
    private readonly adressRepository: Repository<AdressEntity>,

    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAdress(
    createAdressDto: CreateAdressDto,
    userId: number,
  ): Promise<AdressEntity> {
    await this.userService.findByUserId(userId);
    await this.cityService.findByCityId(createAdressDto.cityId);

    const adressEntity = new AdressEntity();

    Object.assign(adressEntity, createAdressDto as AdressEntity);
    adressEntity.userId = userId;

    return await this.adressRepository.save(adressEntity);
  }

  public async updateAdress(
    userId: number,
    adressId: number,
    updatedAdressDto: UpdateAdressDto,
  ): Promise<AdressEntity> {
    const adress = await this.adressRepository.findOne({
      where: { id: adressId },
      relations: {
        user: true,
      },
    });
    await this.userService.findByUserId(userId);
    await this.cityService.findByCityId(updatedAdressDto.cityId!);

    if (adress?.user?.id !== userId)
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse endereço',
      );

    Object.assign(adress, updatedAdressDto as AdressEntity);

    return this.adressRepository.save(adress);
  }
}
