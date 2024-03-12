import { CartService } from './cart.service';
import { ListCartDto } from './dto/list-cart.dto';
import { UserType } from '../user/enum/type-user.enum';
import { InsertProductDto } from './dto/insert-product.dto';
import { Roles } from 'src/resources/decorators/roles.decorator';
import { RequestUser } from '../auth/interfaces/request-user.interface';
import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';

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
}
