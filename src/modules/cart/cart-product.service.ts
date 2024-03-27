import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { InsertProductDto } from './dto/insert-product.dto';
import { ProductService } from '../product/product.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from '../product/entities/product.entity';
import { CartProductEntity } from './entities/cart-product.entity';
import { ICartProductService } from './interfaces/cart-product.interface';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartProductService implements ICartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly productService: ProductService,
  ) {}

  public async addToCartProduct(
    insertProductDto: InsertProductDto,
    cartEntity: CartEntity,
  ): Promise<CartProductEntity> {
    const product = await this.productService.findProductById(
      insertProductDto.productId,
    );

    const cartProduct = await this.verifyProductInCart(
      insertProductDto.productId,
      cartEntity.id,
    ).catch(() => undefined);

    if (!cartProduct)
      return await this.createProductCart(insertProductDto, cartEntity.id);
    else if (insertProductDto.amount > product.availableAmount)
      throw new BadRequestException(
        `A quantidade solicitada (${insertProductDto.amount}) é maior do que a disponível (${product.availableAmount}) para o produto ${product.name}`,
      );

    cartProduct.amount += insertProductDto.amount;

    return await this.cartProductRepository.save({ ...cartProduct });
  }

  public async deleteToCartProduct(
    productId: number,
    cartId: number,
  ): Promise<void> {
    await this.cartProductRepository.delete({
      productId,
      cartId,
    });
  }

  public async updateToCartProduct(
    updateCartDto: UpdateCartDto,
    cartEntity: CartEntity,
  ) {
    const product = await this.productService.findProductById(
      updateCartDto.productId,
    );

    const cartProduct = await this.verifyProductInCart(
      updateCartDto.productId,
      cartEntity.id,
    );

    if (updateCartDto.amount > product.availableAmount)
      throw new BadRequestException(
        `A quantidade solicitada (${updateCartDto.amount}) é maior do que a disponível (${product.availableAmount}) para o produto ${product.name}`,
      );

    return await this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCartDto.amount,
    });
  }

  private async createProductCart(
    inserProductInCart: InsertProductDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProductEntity = new CartProductEntity();

    Object.assign(cartProductEntity, {
      amount: inserProductInCart.amount,
      productId: inserProductInCart.productId,
      cartId,
    } as CartProductEntity);

    return await this.cartProductRepository.save(cartProductEntity);
  }

  private async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct)
      throw new NotFoundException(
        `Produto ${productId} não encontrado no carro de compras`,
      );

    return cartProduct;
  }
}
