import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsArray()
  readonly address: string[];

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isAdmin: boolean;
}
