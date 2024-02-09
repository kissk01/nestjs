// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/model/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginInputDto } from 'src/model/dto/login.input.dto';
import { LoginOutputDto } from 'src/model/dto/login.output.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() credentials: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const token = await this.authService.generateJwtToken(user);
    user.refreshToken = token;
    await this.userService.saveRefreshToken(user);
    return { token };
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    const user = await this.userService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      balance: createUserDto.balance,
      name: createUserDto.name,
    });

    const token = await this.authService.generateJwtToken(user);
    user.refreshToken = token;
    await this.userService.saveRefreshToken(user);
    return { token };
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('accessToken') accessToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(accessToken);
  }
}
