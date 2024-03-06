import { productEntityMock } from './product.mock';
import { CreateProductDto } from '../dto/create-product.dto';
import { categoryEntityMock } from '../../category/__mocks__/category.mock';

export const createProductMock: CreateProductDto = {
  name: productEntityMock.name,
  description: productEntityMock.description,
  categoryId: categoryEntityMock.id,
  price: productEntityMock.price,
};
