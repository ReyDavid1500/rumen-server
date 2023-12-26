import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(200)
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  readonly image: string;

  @IsString()
  readonly category: string;

  @IsBoolean()
  readonly inStock: boolean = true;

  @IsBoolean()
  readonly isDeleted: boolean = false;

  @IsDate()
  readonly createdAt: Date = new Date();

  @IsDate()
  readonly updatedAt: Date = new Date();
}
