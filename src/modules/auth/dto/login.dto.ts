import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string;
}
