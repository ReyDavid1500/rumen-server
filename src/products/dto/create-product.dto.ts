import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsUrl()
  readonly image: string;

  @IsString()
  readonly category: string;

  @IsBoolean()
  readonly inStock: boolean = true;

  @IsBoolean()
  readonly isDeleted: boolean = false;

  // @IsDate()
  // readonly createdAt: Date = new Date();

  // @IsDate()
  // readonly updatedAt: Date = new Date();
}
