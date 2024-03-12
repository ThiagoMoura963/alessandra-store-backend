import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartEntity } from './entities/cart.entity';
import { ProductModule } from '../product/product.module';
import { CartProductService } from './cart-product.service';
import { ProductEntity } from '../product/entities/product.entity';
import { CartProductEntity } from './entities/cart-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartProductEntity, ProductEntity]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartProductService],
})
export class CartModule {}
