import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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
    const activationUrl = `http://localhost:5173/confirm-email-button?token=${token}`;
    return await this.mailerService.sendMail({
      to: confirmationEmail.email,
      from: 'davidguzman1500@gmail.com',
      subject: 'Activa tu cuenta Rumen',
      html: `<p>Hola ${confirmationEmail.name}, activa tu cuenta haciendo click en el siguiente link</p><br><a href="${activationUrl}">Haz click Aquí!!</a>`,
    });
  }
}
