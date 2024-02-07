import { IsInt, IsMongoId, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateShoppingCartDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsInt()
  @Min(1)
  quantity: number;
}
