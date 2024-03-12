import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImageEntity } from './product-image.entity';
import { CartProductEntity } from '../../cart/entities/cart-product.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'price', type: 'double precision', nullable: false })
  price: number;

  @Column({ name: 'available_amount', nullable: false })
  availableAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImageEntity[];

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
  cartProducts?: CartProductEntity[];
}
