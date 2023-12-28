import {
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsObject()
  products: string[];

  @IsInt()
  @Min(0)
  totalPrice: number;

  @IsObject()
  address: object;

  @IsString()
  @MaxLength(13)
  phone: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
