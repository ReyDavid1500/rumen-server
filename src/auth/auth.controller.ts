import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.loginToken(req.user);
  }

  @Post('verify')
  async verifyToken(@Body() email: string, @Body() password: string) {
    return this.authService.validateUser(email, password);
  }

  @Post('confirm-account')
  async confirmAccount(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
