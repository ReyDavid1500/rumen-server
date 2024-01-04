import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AddressModule,
    AuthModule,
  ],
})
export class AppModule {}
