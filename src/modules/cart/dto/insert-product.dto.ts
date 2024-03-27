import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class InsertProductDto {
  @IsInt()
  @IsNotEmpty({ message: 'O id do produto é obrigatório' })
  productId: number;

  @IsInt()
  @Min(1, { message: 'É preciso adicionar pelo menos 1 quantidade do produto' })
  amount: number;
}
