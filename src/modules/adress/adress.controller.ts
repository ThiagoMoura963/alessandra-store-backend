import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { RequestUser } from '../auth/interfaces/request-user.interface';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AdressEntity } from './entities/adress.entity';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from '../user/enum/type-user.enum';

@Roles(UserType.User)
@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post()
  public async createAdressDto(
    @Body() createAdressDto: CreateAdressDto,
    @Req() req: RequestUser,
  ): Promise<{ adress: AdressEntity; message: string }> {
    const userId = req.user.sub;
    const newAdress = await this.adressService.createAdress(
      createAdressDto,
      userId,
    );

    return {
      adress: newAdress,
      message: 'endereço cadastrado com sucesso',
    };
  }

  @Patch(':id')
  public async updateAdress(
    @Req() req: RequestUser,
    @Param('id') adressId: number,
    @Body() updatedAdressDto: UpdateAdressDto,
  ): Promise<{ adress: AdressEntity; message: string }> {
    const userId = req.user.sub;
    const updatedAdress = await this.adressService.updateAdress(
      userId,
      adressId,
      updatedAdressDto,
    );

    return {
      adress: updatedAdress,
      message: 'endereço atualizado com sucesso',
    };
  }
}
