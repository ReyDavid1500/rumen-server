import {
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';
import { OrderProduct } from 'src/interfaces/order.interface';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: OrderProduct[];

  @IsInt()
  @Min(0)
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly address: Types.ObjectId;

  @IsString()
  @MaxLength(13)
  readonly phone: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
