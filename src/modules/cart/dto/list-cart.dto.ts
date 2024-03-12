import { CartEntity } from '../entities/cart.entity';
import { ListCartProductDto } from './list-cart-product.dto';

export class ListCartDto {
  id: number;
  userId: number;
  cartProduct?: ListCartProductDto[];

  constructor(cartEntity: CartEntity) {
    this.id = cartEntity.id;
    this.userId = cartEntity.userId;

    this.cartProduct = cartEntity.cartProducts
      ? cartEntity.cartProducts.map(
          (cartProduct) => new ListCartProductDto(cartProduct),
        )
      : undefined;
  }
}
