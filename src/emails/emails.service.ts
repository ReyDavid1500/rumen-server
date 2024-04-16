import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactDataDto } from './dto/contactData.dto';

export interface ConfirmationEmail {
  email: string;
  name: string;
}

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(
    confirmationEmail: ConfirmationEmail,
    token: string,
  ): Promise<void> {
    // const devUrl = process.env.DEV_URL;
    const productionUrl = process.env.PRODUCTION_URL;

    const activationUrl = `${productionUrl}/confirm-email-button?token=${token}`;
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
}
