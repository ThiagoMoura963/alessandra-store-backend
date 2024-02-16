import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  password: string;

  @IsNotEmpty({ message: 'O campo telefone é obrigatório' })
  phone: string;

  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  @MinLength(11, { message: 'Cpf inválido' })
  cpf: string;
}
