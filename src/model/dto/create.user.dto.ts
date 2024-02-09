import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNumber()
  balance: number;
}
