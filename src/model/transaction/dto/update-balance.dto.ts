// request-money.dto.ts
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBalanceDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  amount: number;
}
