import {
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Address } from 'src/address/schemas/address.schema';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsObject()
  products: CreateProductDto[];

  @IsInt()
  @Min(0)
  totalPrice: number;

  @IsObject()
  address: Address;

  @IsString()
  @MaxLength(13)
  phone: string;

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();

  @IsBoolean()
  isCompleted: boolean = false;
}
