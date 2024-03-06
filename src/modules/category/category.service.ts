import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ICategoryService } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || !categories.length)
      throw new NotFoundException('Nenhuma categoria foi encontrada');

    return categories;
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(
      createCategoryDto.name,
    ).catch(() => undefined);

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategoryDto.name} exist`,
      );
    }

    return await this.categoryRepository.save(createCategoryDto);
  }
  public async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ name });

    if (!category)
      throw new NotFoundException(`A categoria ${name} não foi encontrada`);

    return category;
  }

  public async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`A cadegoria de id ${id} não foi encontrada`);

    return category;
  }
}
