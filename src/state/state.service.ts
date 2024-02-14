import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { IStateService } from './interfaces/state.interface';

@Injectable()
export class StateService implements IStateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  public async getAllStates() {
    return await this.stateRepository.find();
  }
}
