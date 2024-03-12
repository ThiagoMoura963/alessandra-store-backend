import { PartialType } from '@nestjs/mapped-types';
import { InsertProductDto } from './insert-product.dto';

export class UpdateCartDto extends PartialType(InsertProductDto) {}
