import {
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderProductDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Types.ObjectId;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly userId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  readonly products: CreateOrderProductDto[];

  @IsNotEmpty()
  @IsMongoId()
  readonly address: Types.ObjectId;

  @IsString()
  @MaxLength(13)
  readonly phone: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
