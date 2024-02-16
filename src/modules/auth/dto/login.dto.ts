import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string;
}
