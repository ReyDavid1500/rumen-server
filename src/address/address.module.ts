import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { Address, AddressSchema } from './schemas/address.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
