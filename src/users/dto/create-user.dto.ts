import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(13)
  readonly phone: string;

  @IsArray()
  readonly address: CreateAddressDto[];

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  isAdmin: boolean = false;
}
