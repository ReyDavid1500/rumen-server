import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfirmationEmail, EmailsService } from './emails.service';
import { ContactDataDto } from './dto/contactData.dto';

@Controller('emails')
export class EmailsControllers {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  sendEmail(
    @Body() confirmationEmail: ConfirmationEmail,
    token: string,
  ): Promise<void> {
    return this.emailsService.sendConfirmationEmail(confirmationEmail, token);
  }

  @Post('reset-email')
  sendResetEmail(@Body() email: string, resetToken: string): Promise<void> {
    return this.emailsService.sendRestorePasswordEmail(email, resetToken);
  }

  @Post('contact')
  sendContactEmail(@Body() contactData: ContactDataDto) {
    return this.emailsService.sendContactEmail(contactData);
  }
}
