import { CartEntity } from '../entities/cart.entity';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { InsertProductDto } from '../dto/insert-product.dto';

export interface ICartService {
  findCartByUserId(userId: number, isRelations: boolean): Promise<CartEntity>;
  insertProductInCart(
    inserProductInCart: InsertProductDto,
    userId: number,
  ): Promise<CartEntity>;
  deleteProductInCart(productId: number, userId: number): Promise<void>;
  updateProductInCart(
    userId: number,
    updateCartDto: UpdateCartDto,
  ): Promise<CartEntity>;
}
