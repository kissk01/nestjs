// user.controller.ts
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDocument } from 'src/model/schemas/user.schema';
import { AuthUser } from './user.decorator';
import { UserTokenPayloadDto } from 'src/model/dto/user.token.payload.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllUsers(
    @AuthUser() user: UserTokenPayloadDto,
  ): Promise<UserDocument[]> {
    const allUsers = await this.userService.findAllUsers();
    this.logger.debug(' object for user: ', { user });
    return allUsers;
  }

  @Get('balance')
  @UseGuards(AuthGuard('jwt'))
  async getUserBalance(@AuthUser() user: UserTokenPayloadDto): Promise<number> {
    const userBalance = await this.userService.getUserBalance(user.email);
    return userBalance;
  }
}
