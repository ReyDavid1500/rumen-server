import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly address: string;

  @IsStrongPassword()
  readonly password: string;

  @IsBoolean()
  isActive: boolean = true;

  @IsString()
  @IsNotEmpty()
  role: string = 'customer';
}

// Para una segunda Etapa!!
// export class CreateAddressWithUserDto {
//   @IsString()
//   @IsNotEmpty()
//   readonly street: string;

//   @IsInt()
//   @IsNotEmpty()
//   readonly number: number;

//   @IsString()
//   @IsNotEmpty()
//   readonly city: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly province: string;

//   @IsBoolean()
//   isDeleted: boolean = false;

//   @IsBoolean()
//   isChosen: boolean = false;
// }
