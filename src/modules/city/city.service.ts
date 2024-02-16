import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICityService } from './interfaces/city.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAllCities(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  public async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const cities = await this.cityRepository.find({
      where: {
        stateId,
      },
    });

    if (!cities)
      throw new NotFoundException(`O Id ${stateId} do Estado não existe`);

    return cities;
  }

  public async findByCityId(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOneBy({ id: cityId });

    if (!city)
      throw new NotFoundException(`O id ${cityId} da cidade não existe`);

    return city;
  }
}
