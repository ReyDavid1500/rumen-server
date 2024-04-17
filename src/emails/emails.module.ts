import { Module } from '@nestjs/common';
import { EmailsControllers } from './emails.controller';
import { EmailsService } from './emails.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [EmailsControllers],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
