import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { IProductService } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly categoryService: CategoryService,
  ) {}

  public async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: { images: true },
    });

    if (!products || !products.length)
      throw new NotFoundException('Nenhum produto foi encontrado');

    return products;
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProductDto.categoryId);

    const productEntity = new ProductEntity();

    Object.assign(productEntity, createProductDto as ProductEntity);

    return this.productRepository.save(productEntity);
  }

  public async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product)
      throw new NotFoundException(
        `O produto de id ${productId} não foi encontrado`,
      );

    return product;
  }

  public async deleteProduct(productId: number): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    await this.productRepository.delete({ id: product.id });

    return product;
  }

  public async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);

    Object.assign(product, updateProductDto as ProductEntity);

    return this.productRepository.save(product);
  }
}
