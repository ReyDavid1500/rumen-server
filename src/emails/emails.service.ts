import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(): void {
    this.mailerService.sendMail({
      to: 'davidguzman1500@gmail.com',
      from: 'davidguzman1500@gmail.com',
      subject: 'Testing',
      text: 'welcome',
      html: '<p>Has click aquí para activar tu email</p>',
    });
  }
}
