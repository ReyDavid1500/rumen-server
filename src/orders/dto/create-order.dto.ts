import {
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsString,
  Min,
} from 'class-validator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsObject()
  products: CreateProductDto[];

  @IsInt()
  @Min(0)
  totalPrice: number;

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();

  @IsBoolean()
  isCompleted: boolean = false;
}
