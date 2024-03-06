import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { categoryEntityMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryEntityMock]),
            findOneBy: jest.fn().mockResolvedValue(categoryEntityMock),
            save: jest.fn().mockResolvedValue(categoryEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return list categories', async () => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([categoryEntityMock]);
  });

  it('should return error if list of categories empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);

    expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error in list categories exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllCategories()).rejects.toThrow();
  });

  it('should return error if name category exists', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category after save', async () => {
    jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(null);

    const category = await service.createCategory(createCategoryMock);

    expect(category).toEqual(categoryEntityMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());

    expect(service.createCategory(createCategoryMock)).rejects.toThrow();
  });

  it('should return category to findByNameCategory', async () => {
    const category = await service.findCategoryByName(categoryEntityMock.name);

    expect(category).toEqual(categoryEntityMock);
  });

  it('should return category to findByNameCategory if empty name', async () => {
    jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(null);

    expect(
      service.findCategoryByName(categoryEntityMock.name),
    ).rejects.toThrow();
  });

  it('should return category by id', async () => {
    const category = await service.findCategoryById(categoryEntityMock.id);

    expect(category).toEqual(categoryEntityMock);
  });

  it('should return error if category by id doest not exist', async () => {
    jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(null);

    expect(service.findCategoryById(categoryEntityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
