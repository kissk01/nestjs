// request-money.dto.ts
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RequestMoneyDto {
  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
