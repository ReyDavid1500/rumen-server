import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmationEmail, EmailsService } from './emails.service';

@Controller('emails')
export class EmailsControllers {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  sendEmail(@Body() confirmationEmail: ConfirmationEmail): Promise<void> {
    return this.emailsService.sendConfirmationEmail(confirmationEmail);
  }
}
