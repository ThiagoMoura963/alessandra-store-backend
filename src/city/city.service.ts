import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { ICityService } from './interfaces/city.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,

    private readonly cacheService: CacheService,
  ) {}

  async getAllCities(): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(() =>
      this.cityRepository.find(),
    );
  }

  public async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      () =>
        this.cityRepository.find({
          where: {
            stateId,
          },
        }),
      `state_${stateId}`,
    );
  }

  public async findByCityId(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOneBy({ id: cityId });

    if (!city)
      throw new HttpException(
        'Id da cidade não encontrado',
        HttpStatus.NOT_FOUND,
      );

    return city;
  }
}
