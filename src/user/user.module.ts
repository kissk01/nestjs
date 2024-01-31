// user.module.ts
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserModel, UserSchema } from 'src/model/schemas/user.schema';
import { UserController } from './user.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSchema.name, schema: UserModel }]),
    ,
  ],
  providers: [UserService, Logger],
  controllers: [UserController],
})
export class UserModule {}
