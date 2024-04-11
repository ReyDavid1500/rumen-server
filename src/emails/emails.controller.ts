import { Body, Controller, Post } from '@nestjs/common';
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

  @Post('contact')
  sendContactEmail(@Body() contactData: ContactDataDto) {
    return this.emailsService.sendContactEmail(contactData);
  }
}
