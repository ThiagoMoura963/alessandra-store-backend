import { CategoryService } from './category.service';
import { UserType } from '../user/enum/type-user.enum';
import { ListCategoryDto } from './dto/list-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../../resources/decorators/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.User, UserType.Admin)
  @Get()
  public async findAllCategories(): Promise<ListCategoryDto[]> {
    const categories = await this.categoryService.findAllCategories();
    const listedCategories = categories.map(
      (category) => new ListCategoryDto(category.id, category.name),
    );

    return listedCategories;
  }

  @Roles(UserType.Admin)
  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategoryDto);
  }
}
