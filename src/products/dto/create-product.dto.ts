import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsString()
  category: string;

  @IsBoolean({ always: true })
  inStock: boolean;

  @IsBoolean()
  isDeleted: boolean;
}
