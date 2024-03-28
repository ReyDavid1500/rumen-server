import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { PayloadToken } from 'src/interfaces/payloadToken.interface';
import { EmailsService } from 'src/emails/emails.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailsService: EmailsService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  loginToken(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    const { name, address, email } = user;
    return {
      access_token: this.jwtService.sign(payload),
      name,
      address,
      email,
    };
  }

  async signUp(user: CreateUserDto) {
    const existingUser = await this.usersService.getUserEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('El correo ya existe');
    }

    const newUser = await this.usersService.createUser(user);
    console.log(newUser);

    await this.emailsService.sendConfirmationEmail({
      email: newUser.email,
      name: newUser.name,
    });
  }
}
