import { IsEmail, IsString } from 'class-validator';

export class ContactDataDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  message: string;
}
