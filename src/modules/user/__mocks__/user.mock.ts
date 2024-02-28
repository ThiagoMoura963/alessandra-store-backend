import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/type-user.enum';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '$2b$10$jiRUC90nSOdl4gT/QO.ex.bxPiJnhy/vUp9HFn4pXWIdXSfLuh632',
  phone: '1234567890',
  cpf: '12345678900',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
