import { ProductService } from './product.service';
import { UserType } from '../user/enum/type-user.enum';
import { ListProductDto } from './dto/list-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../../resources/decorators/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin)
  @Post()
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDto);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get()
  public async findAllProducts(): Promise<ListProductDto[]> {
    const products = await this.productService.findAllProducts();
    const productListed = products.map(
      (product) => new ListProductDto(product),
    );

    return productListed;
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  public async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<{ product: ListProductDto; message: string }> {
    const productDeleted = await this.productService.deleteProduct(productId);

    return {
      product: new ListProductDto(productDeleted),
      message: 'produto deletado com sucesso',
    };
  }

  @Roles(UserType.Admin)
  @Patch('/:productId')
  public async updateProduct(
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ product: ListProductDto; message: string }> {
    const productUpdated = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    return {
      product: new ListProductDto(productUpdated),
      message: 'produto atualizado com sucesso',
    };
  }
}
