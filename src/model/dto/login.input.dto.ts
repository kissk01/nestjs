import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
