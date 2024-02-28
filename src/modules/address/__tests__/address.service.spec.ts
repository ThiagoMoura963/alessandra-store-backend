import { Repository } from 'typeorm';
import { AddressService } from '../address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { AddressEntity } from '../entities/address.entity';
import { addressEntityMock } from '../__mocks__/address.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { createAdressMock } from '../__mocks__/create-address.mock';

describe('CityService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
            find: jest.fn().mockResolvedValue([addressEntityMock]),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAdress(
      createAdressMock,
      userEntityMock.id,
    );

    expect(address).toEqual(addressEntityMock);
  });

  it('should return error if exception UserService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAdress(createAdressMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return error if exception CityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAdress(createAdressMock, userEntityMock.id),
    ).rejects.toThrow();
  });

  it('should return user addresses', async () => {
    const addresses = await service.findAddressByUserId(userEntityMock.id);

    expect(addresses).toEqual([addressEntityMock]);
  });

  it('should return user addresses', async () => {
    const addresses = await service.findAddressByUserId(userEntityMock.id);

    expect(addresses).toEqual([addressEntityMock]);
  });

  it('should return an error if the user does not exist', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined!);

    expect(service.findAddressByUserId(userEntityMock.id)).rejects.toThrow();
  });
});
