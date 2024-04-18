import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CityService } from './city.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('City')
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
