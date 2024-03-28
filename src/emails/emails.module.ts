import { Module } from '@nestjs/common';
import { EmailsControllers } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  controllers: [EmailsControllers],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
