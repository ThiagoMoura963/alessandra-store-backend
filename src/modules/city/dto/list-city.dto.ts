import { ListStateDto } from '../../state/dto/list-state.dto';
import { CityEntity } from '../entities/city.entity';

export class ListCityDto {
  name: string;
  state?: ListStateDto;

  constructor(cityEntity: CityEntity) {
    this.name = cityEntity.name;
    this.state = cityEntity.state
      ? new ListStateDto(cityEntity.state.name)
      : undefined;
  }
}
