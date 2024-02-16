import { StateEntity } from '../entities/state.entity';

export interface IStateService {
  getAllStates(): Promise<StateEntity[]>;
}
