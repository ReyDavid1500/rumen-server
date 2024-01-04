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
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() address: CreateAddressDto) {
    return await this.addressService.createAddress(address);
  }

  @Get()
  findAll() {
    return this.addressService.getAddresses();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.addressService.getAddress(id);
  }
  @Get(':userId/order')
  findUserAddress(@Param('userId', MongoIdPipe) userId: Types.ObjectId) {
    return this.addressService.getUserAddresses(userId);
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
