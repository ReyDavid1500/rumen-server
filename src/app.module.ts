import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { EmailsModule } from './emails/emails.module';
import * as Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        DATABASE_CONNECTION: Joi.string().required(),
        SECRET_VALUE: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        SMTP_USERNAME: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        BASE_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      preview: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AddressModule,
    AuthModule,
    ShoppingCartModule,
    EmailsModule,
  ],
})
export class AppModule {}
