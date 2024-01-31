import { IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  email: string;

  @IsString()
  sub: string;
}
