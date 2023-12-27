import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const newAddress = new this.addressModel(createAddressDto);
    return await newAddress.save();
  }

  async getAddresses(): Promise<Address[]> {
    const Addresses = await this.addressModel.find();
    return Addresses;
  }

  async geAddress(id: string): Promise<Address> {
    const user = await this.addressModel.findById(id);
    return user;
  }

  async updateAddress(
    id: string,
    updateAddress: UpdateAddressDto,
  ): Promise<Address> {
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      updateAddress,
      {
        new: true,
      },
    );
    return updatedAddress;
  }

  async removeAddress(id: string): Promise<boolean> {
    const Address = await this.addressModel.findByIdAndDelete(id);
    if (!Address) {
      throw new NotFoundException(`Address #${id} not found`);
    }
    return true;
  }
}
