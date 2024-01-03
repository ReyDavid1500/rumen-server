import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAddressDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsInt()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly province: string;

  @IsBoolean()
  isDeleted: boolean = false;

  @IsBoolean()
  isChosen: boolean = false;
}
