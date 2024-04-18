import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class UserSessionDto {
  @ApiProperty()
  @IsJWT({ message: 'Token inválido' })
  jwtToken: string;
}
