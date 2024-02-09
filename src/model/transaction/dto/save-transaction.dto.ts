import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class SaveTransactionDto {
  @IsEmail()
  @IsNotEmpty()
  senderEmail: string;

  @IsEmail()
  @IsNotEmpty()
  recipientEmail: string;

  @IsNumber()
  amount: number;
}
