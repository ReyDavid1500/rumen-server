import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-authGuard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Roles(Role.CUSTOMER)
  @Post()
  create(
    @Req() request: any,
    @Body() createShoppingCartDto: CreateShoppingCartDto[],
  ) {
    return this.shoppingCartService.createNewShoppingCart(
      request.user.sub,
      createShoppingCartDto,
    );
  }

  @Roles(Role.CUSTOMER)
  @Patch(':cartId')
  addNewProduct(
    @Param('cartId', MongoIdPipe) cartId: string,
    @Body() products: CreateShoppingCartDto[],
  ) {
    return this.shoppingCartService.addProductsToCart(cartId, products);
  }

  @Get(':cartId')
  findShoppingCart(@Param('cartId', MongoIdPipe) cartId: string) {
    return this.shoppingCartService.getShoppingCart(cartId);
  }

  @Roles(Role.CUSTOMER)
  @Get()
  findShoppingCartByUserId(@Req() request: any) {
    const userId = request.user.sub;
    return this.shoppingCartService.getShoppingCartByUserId(userId);
  }

  @Delete(':cartId/product/:productId')
  removeProductFromCart(
    @Param('cartId', MongoIdPipe) cartId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.shoppingCartService.deleteProductFromCart(cartId, productId);
  }
}
