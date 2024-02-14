import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @IsEmail(undefined, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatória' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'A senha não corresponde aos requisitos' },
  )
  password: string;

  @IsNotEmpty({ message: 'O campo telefone é obrigatório' })
  phone: string;

  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  @MinLength(11, { message: 'Cpf inválido' })
  cpf: string;
}
