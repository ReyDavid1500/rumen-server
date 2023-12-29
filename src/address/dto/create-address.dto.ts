import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  readonly street: string;

  @IsInt()
  readonly number: number;

  @IsString()
  readonly city: string;

  @IsString()
  readonly province: string;

  @IsBoolean()
  isDeleted: boolean = false;

  @IsBoolean()
  isChosen: boolean = false;
}
