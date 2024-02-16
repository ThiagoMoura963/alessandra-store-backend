import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CityService } from './city.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from '../user/enum/type-user.enum';

@Roles(UserType.User)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @Get(':stateId')
  @UseInterceptors(CacheInterceptor)
  async getAllCitiesByStateId(@Param('stateId') stateId: number) {
    return await this.cityService.getAllCitiesByStateId(stateId);
  }
}
