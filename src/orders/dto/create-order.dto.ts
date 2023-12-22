import {
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsString,
  Min,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsObject()
  products: Product[];

  @IsInt()
  @Min(0)
  totalPrice: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
  // Preguntar a la March!!
  @IsBoolean()
  isCompleted: boolean;
}
