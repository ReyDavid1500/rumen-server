import { IsInt, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsInt()
  number: number;

  @IsString()
  city: string;

  @IsString()
  province: string;
}
