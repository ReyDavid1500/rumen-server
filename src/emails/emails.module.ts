import { Module } from '@nestjs/common';
import { EmailsControllers } from './emails.controller';
import { EmailsService } from './emails.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'davidguzman1500@gmail.com',
          pass: process.env.GMAIL_APP_PASS,
        },
      },
    }),
  ],
  controllers: [EmailsControllers],
  providers: [EmailsService],
})
export class EmailsModule {}
