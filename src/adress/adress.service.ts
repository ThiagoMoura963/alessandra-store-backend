import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdressEntity } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { IAdressService } from './interfaces/adress.interface';
import { CreateAdressDto } from './dto/create-adress.dto';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';

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

    Object.assign(adressEntity, createAdressDto);
    adressEntity.userId = userId;

    return await this.adressRepository.save(adressEntity);
  }
}
