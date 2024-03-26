import { Controller, Get } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsControllers {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  sendEmail(): void {
    return this.emailsService.sendEmail();
  }
}
