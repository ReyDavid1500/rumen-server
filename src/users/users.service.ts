import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AddUserInfo } from './dto/addUserInfo.dto';

export interface confirmEmailPayload {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    await newUser.save();
    return newUser;
  }

  async addUserInfoToOrder(id: string, userInfo: AddUserInfo) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      phone: userInfo.phone,
      address: userInfo.address,
    });
    return updatedUser.save();
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} does not exist!`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const userEmail = await this.userModel.findOne({ email }).exec();
    if (!userEmail) {
      return null;
    }
    return userEmail;
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

  async activateUser(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Usuaro no existe');
    } else {
      user.isActive = true;
      await user.save();
    }
  }
}
