import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserTokenPayloadDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  userId: string;
}
