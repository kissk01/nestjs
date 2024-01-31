// user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDocument } from 'src/model/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllUsers(): Promise<UserDocument[]> {
    const allUsers = await this.userService.findAllUsers();
    return allUsers;
  }
}
