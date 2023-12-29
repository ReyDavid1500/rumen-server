import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  async create(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() address: CreateAddressDto,
  ) {
    return await this.addressService.createAddress(userId, address);
  }

  @Get()
  findAll() {
    return this.addressService.getAddresses();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.addressService.geAddress(id);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.addressService.removeAddress(id);
  }
}
