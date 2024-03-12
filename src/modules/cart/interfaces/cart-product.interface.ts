import { InsertProductDto } from '../dto/insert-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';
import { CartEntity } from '../entities/cart.entity';

export interface ICartProductService {
  addToCartProduct(
    inserProductInCart: InsertProductDto,
    cartEntity: CartEntity,
  ): Promise<CartProductEntity>;
}
