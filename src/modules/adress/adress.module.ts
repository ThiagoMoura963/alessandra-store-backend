import { Module } from '@nestjs/common';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressEntity } from './entities/adress.entity';
import { UserModule } from '../user/user.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdressEntity]), UserModule, CityModule],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {}
