import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  city: string;

  @IsString()
  province: string;
}
