import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryService {
  findAllCategories(): Promise<CategoryEntity[]>;
  createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  findCategoryByName(name: string): Promise<CategoryEntity>;
  findCategoryById(categoryId: number): Promise<CategoryEntity>;
}
