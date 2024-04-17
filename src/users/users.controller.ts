import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-authGuard';
import { AddUserInfo } from './dto/addUserInfo.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user-info')
  addOrderInfo(@Req() request: any, @Body() userInfo: AddUserInfo) {
    const userId = request.user.sub;
    return this.usersService.addUserInfoToOrder(userId, userInfo);
  }

  @Get('/all')
  @ApiOperation({ summary: 'List of Users' })
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  findOneByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOneByToken(@Req() request: any) {
    return this.usersService.getUserShippingInfo(request.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('token')
  findByToken(@Req() request: any) {
    return this.usersService.getUser(request.user.sub);
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

  @UseGuards(JwtAuthGuard)
  @Get('activate/user')
  async confirmUser(@Req() request: any) {
    try {
      return await this.usersService.activateUser(request.user.email);
    } catch (error) {
      return 'Invalid token or account activation failed.';
    }
  }
}
