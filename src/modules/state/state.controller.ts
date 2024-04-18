import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates() {
    return await this.stateService.getAllStates();
  }
}
