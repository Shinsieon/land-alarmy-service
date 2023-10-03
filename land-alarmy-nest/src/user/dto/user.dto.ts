import { IsArray, IsNumber, IsString } from 'class-validator';
import { RTMSDataSvcSHRent_Inf } from 'src/interface/RTMSDataSvc.interface';

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
