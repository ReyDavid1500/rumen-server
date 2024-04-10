import { IsString } from 'class-validator';

export class AddUserInfo {
  @IsString()
  phone: string;

  @IsString()
  address: string;
}
