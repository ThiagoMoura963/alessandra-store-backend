import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsInt()
  @IsNotEmpty({ message: 'O id do produto é obrigatório' })
  productId: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'É preciso adicionar pelo menos 1 quantidade do produto' })
  amount: number;
}
