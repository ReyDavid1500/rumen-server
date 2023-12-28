import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class CreateAddressDto {
  @IsString()
  userId: User;

  @IsString()
  street: string;

  @IsInt()
  number: number;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();

  @IsBoolean()
  isDeleted: boolean = false;

  @IsBoolean()
  isSelected: boolean = false;
}
