import { CartService } from './cart.service';
import { ListCartDto } from './dto/list-cart.dto';
import { UserType } from '../user/enum/type-user.enum';
import { InsertProductDto } from './dto/insert-product.dto';
import { Roles } from '../../resources/decorators/roles.decorator';
import { RequestUser } from '../auth/interfaces/request-user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserType.Admin, UserType.User)
  @Post()
  public async inserProductInCart(
    @Body() insertProductDto: InsertProductDto,
    @Req() req: RequestUser,
  ): Promise<ListCartDto> {
    const userId = req.user.sub;

    const cart = await this.cartService.insertProductInCart(
      insertProductDto,
      userId,
    );

    return new ListCartDto(cart);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get()
  public async findCartByUserId(@Req() req: RequestUser): Promise<ListCartDto> {
    const userId = req.user.sub;

    const cart = await this.cartService.findCartByUserId(userId, true);

    return new ListCartDto(cart);
  }

  @Roles(UserType.Admin, UserType.User)
  @Delete()
  public async clearCart(
    @Req() req: RequestUser,
  ): Promise<{ cart: ListCartDto; message: string }> {
    const userId = req.user.sub;

    const cart = await this.cartService.clearCart(userId);

    return {
      cart: new ListCartDto(cart),
      message: 'Carro de compras limpo com sucesso',
    };
  }

  @Delete('/product/:productId')
  public async deleteProductToCart(
    @Param('productId') productId: number,
    @Req() req: RequestUser,
  ): Promise<{ message: string; success: boolean }> {
    const userId = req.user.sub;

    await this.cartService.deleteProductInCart(productId, userId);

    return {
      message: 'Produto removido do carro de compras com sucesso',
      success: true,
    };
  }

  @Patch()
  public async updateProductToCart(
    @Req() req: RequestUser,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<{ cart: ListCartDto; message: string }> {
    const userId = req.user.sub;

    const cart = await this.cartService.updateProductInCart(
      userId,
      updateCartDto,
    );

    return {
      cart: new ListCartDto(cart),
      message: 'Carro de compras atualizado com sucesso',
    };
  }
}
