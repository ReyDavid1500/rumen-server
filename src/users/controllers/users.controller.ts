import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response: any, @Body() user: User) {
    const newUser = await this.usersService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }
}
