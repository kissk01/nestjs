// auth.module.ts
import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/model/schemas/user.schema';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSchema.name, schema: UserModel }]),

    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
  exports: [AuthModule],
  // Make AuthService available for injection in other modules
})
export class AuthModule {}
