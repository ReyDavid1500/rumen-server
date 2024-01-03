import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsStrongPassword,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

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

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsBoolean()
  isAdmin: boolean = false;

  @IsObject()
  @Type(() => CreateAddressDto)
  @ValidateNested({ each: true })
  address: CreateAddressDto;
}
