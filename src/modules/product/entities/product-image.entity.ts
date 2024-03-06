import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_image' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'product_id', nullable: false })
  @Generated('rowid')
  productId: number;

  @Column({ name: 'url', nullable: false })
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;
}
