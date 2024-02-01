import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserModel, UserSchema } from './model/schemas/user.schema';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key_here', // Provide your secret key here
      signOptions: { expiresIn: '1h' }, // Set expiration time
    }),
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongoose-demo'),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: UserModel }]),
    TransactionModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, UserService, Logger, AuthService, JwtStrategy],
})
export class AppModule {}
