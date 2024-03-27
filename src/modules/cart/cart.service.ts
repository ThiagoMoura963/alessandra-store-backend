import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertProductDto } from './dto/insert-product.dto';
import { CartProductService } from './cart-product.service';
import { ICartService } from './interfaces/cart.interface';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    private readonly cartProductService: CartProductService,
  ) {}

  public async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          cartProducts: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations,
    });

    if (!cart) throw new NotFoundException('Carro de compras não encontrado');

    return cart;
  }

  public async insertProductInCart(
    inserProductInCart: InsertProductDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(() => undefined);

    if (!cart) return await this.createCart(userId);

    await this.cartProductService.addToCartProduct(inserProductInCart, cart);

    return cart;
  }

  public async clearCart(userId: number): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
      deletedAt: new Date(),
    });

    return cart;
  }

  public async deleteProductInCart(
    productId: number,
    userId: number,
  ): Promise<void> {
    const cart = await this.findCartByUserId(userId);

    await this.cartProductService.deleteToCartProduct(productId, cart.id);
  }

  public async updateProductInCart(
    userId: number,
    updateCartDto: UpdateCartDto,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId);

    await this.cartProductService.updateToCartProduct(updateCartDto, cart);

    return cart;
  }

  private async createCart(userId: number): Promise<CartEntity> {
    const cartEntity = new CartEntity();

    Object.assign(cartEntity, { userId, active: true } as CartEntity);

    return await this.cartRepository.save(cartEntity);
  }
}
