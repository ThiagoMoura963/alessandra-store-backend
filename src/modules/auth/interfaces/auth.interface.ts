import { ListLogin } from '../dto/list-login.dto';

export interface IAuthService {
  login(email: string, password: string): Promise<ListLogin>;
}
