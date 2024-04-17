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
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async loginToken(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    const { name, address, email, isActive, phone } = user;

    if (isActive === false) {
      throw new BadRequestException('Tu cuenta no esta activada');
    }
    return {
      access_token: this.jwtService.sign(payload),
      name,
      address,
      email,
      phone,
    };
  }

  async signUp(user: CreateUserDto) {
    const existingUser = await this.usersService.getUserByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('El correo ya existe');
    }

    const { email, name } = await this.usersService.createUser(user);

    const payload = { email, name };
    const token = this.jwtService.sign(payload);

    await this.emailsService.sendConfirmationEmail(
      {
        email,
        name,
      },
      token,
    );
  }

  async resetTokenAndEmail(email: string): Promise<string> {
    const payload = { email };
    const resetToken = this.jwtService.sign(payload);

    await this.emailsService.sendRestorePasswordEmail(email, resetToken);

    return resetToken;
  }

  async resetPassword(password: string, resetToken: string) {
    const { email } = await this.jwtService.verifyAsync(resetToken);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.getUserByEmail(email);

    user.password = hashPassword;

    return user.save();
  }
}
