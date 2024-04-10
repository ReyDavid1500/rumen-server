import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty()
  // @IsMongoId()
  // readonly userId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly shoppingCartId: string;

  @IsString()
  readonly payment: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
