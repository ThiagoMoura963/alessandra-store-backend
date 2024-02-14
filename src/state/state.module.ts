import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { StateController } from './state.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
