import { Body, Controller, Param, Post } from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post('/:userId')
  public async createAdressDto(
    @Body() createAdressDto: CreateAdressDto,
    @Param('userId') userId: number,
  ) {
    return await this.adressService.createAdress(createAdressDto, userId);
  }
}
