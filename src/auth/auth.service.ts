// auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/model/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findUserByEmail(email);
    this.logger.debug(user, ' user');
    if (user && (await this.userService.validatePassword(user, password))) {
      return user;
    }
    return null;
  }

  async generateJwtToken(user: UserDocument): Promise<string> {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    delete decodedToken.exp;
    const accessToken = this.jwtService.sign(decodedToken);
    return { accessToken };
  }
}
