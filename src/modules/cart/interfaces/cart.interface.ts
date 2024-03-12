import { InsertProductDto } from '../dto/insert-product.dto';
import { CartEntity } from '../entities/cart.entity';

export interface ICartService {
  findCartByUserId(userId: number, isRelations: boolean): Promise<CartEntity>;
  insertProductInCart(
    inserProductInCart: InsertProductDto,
    userId: number,
  ): Promise<CartEntity>;
}
