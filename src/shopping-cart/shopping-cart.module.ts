import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from './schemas/shopping-cart.schema';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
    ]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
