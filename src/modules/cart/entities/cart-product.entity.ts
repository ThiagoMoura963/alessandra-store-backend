import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'cart_product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'cart_id', nullable: false })
  cartId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartProducts, {})
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartProducts, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;
}
