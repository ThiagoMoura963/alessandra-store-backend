import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdressDto {
  @IsInt()
  @IsNotEmpty({ message: 'O campo Id da cidade é obrigatório' })
  cityId: number;

  @IsString()
  @IsNotEmpty({ message: 'O campo cep é obrigatório' })
  cep: string;

  @IsInt()
  @IsNotEmpty({ message: 'O campo número é obrigatório' })
  number: number;

  @IsString()
  @IsOptional()
  complement: string;
}
