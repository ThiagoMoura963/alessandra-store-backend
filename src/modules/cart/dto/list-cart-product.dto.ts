import { ListProductDto } from 'src/modules/product/dto/list-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';
import { ListCartDto } from './list-cart.dto';

export class ListCartProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ListProductDto;
  cart?: ListCartDto;

  constructor(cartProductEntity: CartProductEntity) {
    this.id = cartProductEntity.id;
    this.cartId = cartProductEntity.cartId;
    this.productId = cartProductEntity.productId;
    this.amount = cartProductEntity.amount;

    this.product = cartProductEntity.product
      ? new ListProductDto(cartProductEntity.product)
      : undefined;

    this.cart = cartProductEntity.cart
      ? new ListCartDto(cartProductEntity.cart)
      : undefined;
  }
}
