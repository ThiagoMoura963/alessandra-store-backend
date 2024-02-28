import { Repository } from 'typeorm';
import { CityService } from '../city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { cityEntityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([cityEntityMock]),
            findOneBy: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return list of cities', async () => {
    const city = await service.getAllCities();

    expect(city).toEqual([cityEntityMock]);
  });

  it('should return findOne city', async () => {
    const city = await service.findCityById(cityEntityMock.id);

    expect(city).toEqual(cityEntityMock);
  });

  it('should return error findOneBy not found city', async () => {
    jest.spyOn(cityRepository, 'findOneBy').mockResolvedValue(null);

    expect(service.findCityById(cityEntityMock.id)).rejects.toThrow();
  });

  it('should return cities in getAllCitiesByStateId', async () => {
    const cities = await service.getAllCitiesByStateId(cityEntityMock.stateId);

    expect(cities).toEqual([cityEntityMock]);
  });
});
