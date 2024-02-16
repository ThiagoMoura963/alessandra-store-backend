import { Request } from 'express';
import { UserPayload } from './user-payload.interface';

export interface RequestUser extends Request {
  user: UserPayload;
}
