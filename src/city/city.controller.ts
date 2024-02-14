import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @Get('/:stateId')
  async getAllCitiesByStateId(@Param('stateId') stateId: number) {
    return await this.cityService.getAllCitiesByStateId(stateId);
  }
}
