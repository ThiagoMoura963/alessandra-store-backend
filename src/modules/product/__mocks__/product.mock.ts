import { ProductEntity } from '../entities/product.entity';
import { categoryEntityMock } from '../../category/__mocks__/category.mock';

export const productEntityMock: ProductEntity = {
  id: 1,
  name: 'product-mock',
  description: 'description-mock',
  categoryId: categoryEntityMock.id,
  price: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};
