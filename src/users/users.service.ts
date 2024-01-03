import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private addressService: AddressService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    await newUser.save();
    const { address } = user;
    const firstAddress = await this.addressService.createAddress({
      userId: newUser._id,
      ...address,
    });
    await firstAddress.save();
    console.log(firstAddress);
    return newUser;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getUserEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    return updatedUser;
  }

  async removeUser(id: string): Promise<boolean> {
    const User = await this.userModel.findByIdAndDelete(id);
    if (!User) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return true;
  }
}
