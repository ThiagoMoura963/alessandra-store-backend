import { CartEntity } from '../entities/cart.entity';
import { InsertProductDto } from '../dto/insert-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export interface ICartProductService {
  addToCartProduct(
    inserProductInCart: InsertProductDto,
    cartEntity: CartEntity,
  ): Promise<CartProductEntity>;
  deleteToCartProduct(productId: number, cartId: number): Promise<void>;
}
