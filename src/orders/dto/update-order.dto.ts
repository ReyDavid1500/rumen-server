import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly product: Types.ObjectId;

  @IsInt()
  @IsNotEmpty()
  readonly quantity: number;
}
