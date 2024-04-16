import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty()
  // @IsMongoId()
  // readonly userId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly shoppingCartId: string;

  @IsString()
  readonly payment: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly phone: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
