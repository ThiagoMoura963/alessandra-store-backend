import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { RequestUser } from '../auth/interfaces/request-user.interface';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { UserType } from '../user/enum/type-user.enum';
import { ListAdressDto } from './dto/list-adress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  public async createAdressDto(
    @Body() createAdressDto: CreateAdressDto,
    @Req() req: RequestUser,
  ): Promise<{ adress: AddressEntity; message: string }> {
    const userId = req.user.sub;
    const newAdress = await this.addressService.createAdress(
      createAdressDto,
      userId,
    );

    return {
      adress: newAdress,
      message: 'endereço cadastrado com sucesso',
    };
  }

  @Get()
  public async findAddressByUserId(
    @Req() req: RequestUser,
  ): Promise<ListAdressDto[]> {
    const userId = req.user.sub;
    const addresses = await this.addressService.findAddressByUserId(userId);
    const listedAddress = addresses.map(
      (address) => new ListAdressDto(address),
    );

    return listedAddress;
  }

  @Patch(':id')
  public async updateAdress(
    @Req() req: RequestUser,
    @Param('id') adressId: number,
    @Body() updatedAdressDto: UpdateAdressDto,
  ): Promise<{ adress: AddressEntity; message: string }> {
    const userId = req.user.sub;
    const updatedAdress = await this.addressService.updateAdress(
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
