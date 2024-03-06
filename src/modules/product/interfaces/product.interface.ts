import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductService {
  findAllProducts(): Promise<ProductEntity[]>;
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
  findProductById(productId: number): Promise<ProductEntity>;
  deleteProduct(productId: number): Promise<ProductEntity>;
  updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity>;
}
