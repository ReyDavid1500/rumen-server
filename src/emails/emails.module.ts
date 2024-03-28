import { Module } from '@nestjs/common';
import { EmailsControllers } from './emails.controller';
import { EmailsService } from './emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: 'davidguzman1500@gmail.com',
            pass: process.env.GMAIL_APP_PASS,
          },
        },
        defaults: {
          from: `"Nice App" <${config.get('SMTP_USERNAME')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailsControllers],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
