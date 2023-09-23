import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  code: string;

  @IsNumber()
  tradeType: { [key: string]: boolean };

  @IsArray()
  price: number[];

  @IsNumber()
  size: number;

  @IsString()
  phoneNumber: string;
}
export interface UserInterface {
  code: string;
  tradeType: { [key: string]: boolean };
  price: number;
  size: number;
  phoneNumber: string;
}
