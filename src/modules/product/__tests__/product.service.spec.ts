import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProductService } from '../product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '../entities/product.entity';
import { productEntityMock } from '../__mocks__/product.mock';
import { CategoryService } from '../../category/category.service';
import { createProductMock } from '../__mocks__/create-product.mock';
import { categoryEntityMock } from '../../category/__mocks__/category.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryEntityMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productEntityMock]),
            findOneBy: jest.fn().mockResolvedValue(productEntityMock),
            save: jest.fn().mockResolvedValue(productEntityMock),
            delete: jest.fn().mockResolvedValue(productEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should list products', async () => {
    const products = await service.findAllProducts();

    expect(products).toEqual([productEntityMock]);
  });

  it('should return error if list products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue(null!);

    expect(service.findAllProducts()).rejects.toThrow(NotFoundException);
  });

  it('should return list products exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllProducts()).rejects.toThrow();
  });

  it('should return product after save', async () => {
    const product = await service.createProduct(createProductMock);

    expect(product).toEqual(productEntityMock);
  });

  it('should return category service exception', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(createProductMock)).rejects.toThrow();
  });

  it('should return error if product not found', async () => {
    jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

    expect(service.findProductById(productEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return product after delete', async () => {
    const product = await service.deleteProduct(productEntityMock.id);

    expect(product).toEqual(productEntityMock);
  });

  it('should return product after update', async () => {
    const product = await service.updateProduct(
      productEntityMock.id,
      updateProductMock,
    );

    expect(product).toEqual(productEntityMock);
  });

  it('should return error update product exception', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(productEntityMock.id, updateProductMock),
    ).rejects.toThrow();
  });
});
