import { ProductEntity } from '../entities/product.entity';
import { ListCategoryDto } from '../../category/dto/list-category.dto';

class ListProductImageDto {
  constructor(
    readonly id: number,
    readonly url: string,
  ) {}
}

export class ListProductDto {
  id: number;
  name: string;
  price: number;
  availableAmount: number;
  images?: ListProductImageDto[];
  category?: ListCategoryDto;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.availableAmount = productEntity.availableAmount;

    this.images = productEntity.images
      ? productEntity.images.map(
          (image) => new ListProductImageDto(image.id, image.url),
        )
      : undefined;

    this.category = productEntity.category
      ? new ListCategoryDto(
          productEntity.category.id,
          productEntity.category.name,
        )
      : undefined;
  }
}
