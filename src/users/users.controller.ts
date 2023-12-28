import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto, @Body() address: CreateAddressDto) {
    return this.usersService.createUser(user, address);
  }

  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.geUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.removeUser(id);
  }
}
