import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateAddressWithUserDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsInt()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly province: string;

  @IsBoolean()
  isDeleted: boolean = false;

  @IsBoolean()
  isChosen: boolean = false;
}

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsObject()
  @IsNotEmpty()
  readonly address: CreateAddressWithUserDto;

  @IsString()
  @MaxLength(13)
  readonly phone: string;

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsString()
  @IsNotEmpty()
  role: string = 'customer';
}
