import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsObject()
  category: String;

  @IsBoolean()
  inStock: boolean;

  @IsBoolean()
  isDeleted: boolean;
}
