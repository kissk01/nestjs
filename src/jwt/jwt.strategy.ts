// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayloadDto } from 'src/model/dto/jwt.payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key_here', // must match the secret used for token signing
    });
  }

  async validate(payload: JwtPayloadDto) {
    // Implement validation logic as needed
    return { email: payload.email, userId: payload.sub };
  }
}
