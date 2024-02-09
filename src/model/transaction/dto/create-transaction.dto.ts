import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
