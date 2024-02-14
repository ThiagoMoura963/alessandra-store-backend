import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string;
}
