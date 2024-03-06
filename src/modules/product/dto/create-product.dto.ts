import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../entities/product.entity';

export class ProductImageDto {
  id: number;

  @IsUrl(undefined, { message: 'Url para imagem inválida' })
  url: string;

  product: ProductEntity;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do produto é obrigatório' })
  description: string;

  @IsInt()
  @IsNotEmpty({ message: 'O id da categoria é obrigatório' })
  categoryId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O preço do produto é obrigatório' })
  price: number;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDto)
  images?: ProductImageDto[];
}
