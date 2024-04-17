import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactDataDto } from './dto/contactData.dto';
import { UsersService } from 'src/users/users.service';
import config from 'config';
import { ConfigType } from '@nestjs/config';

export interface ConfirmationEmail {
  email: string;
  name: string;
}

@Injectable()
export class EmailsService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async sendConfirmationEmail(
    confirmationEmail: ConfirmationEmail,
    token: string,
  ): Promise<void> {
    const baseUrl = this.configService.baseUrl;
    const activationUrl = `${baseUrl}/confirm-email-button?token=${token}`;
    return await this.mailerService.sendMail({
      to: confirmationEmail.email,
      from: 'davidguzman1500@gmail.com',
      subject: 'Activa tu cuenta Rumen',
      html: `<p>Hola ${confirmationEmail.name}, activa tu cuenta haciendo click en el siguiente link</p><br><a href="${activationUrl}">Haz click Aquí!!</a>`,
    });
  }

  async sendContactEmail(contactData: ContactDataDto): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'davidguzman1500@gmail.com',
      from: 'davidguzman1500@gmail.com',
      subject: `Rumen Contacto: Mensaje de ${contactData.name}`,
      html: `<p>Hola mi nombre es ${contactData.name} y mi mensaje es el siguiente: <br> ${contactData.message}. <Br> Este es mi correo de contacto: ${contactData.email}</p>`,
    });
  }

  async sendRestorePasswordEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const baseUrl = this.configService.baseUrl;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('El correo no esta registrado!');
    }
    const resetUrl = `${baseUrl}/password-reset?resetToken=${resetToken}`;
    return this.mailerService.sendMail({
      to: email,
      from: 'davidguzman1500@gmail.com',
      subject: 'Restablece tu contraseña',
      html: `<p>Hola ${user.name}, cambia tu contraseña haciendo click en el siguiente link<p><br><a href="${resetUrl}">Haz click Aquí!!</a>`,
    });
  }
}
