import { Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsControllers {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  sendEmail(): void {
    return this.emailsService.sendEmail();
  }
}
