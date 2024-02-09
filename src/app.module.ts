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
import {
  TransactionModel,
  TransactionSchema,
} from './model/schemas/transaction.schema';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo1:30001,mongo2:30002,mongo3:30003/?replicaSet=my-replica-set',
    ),
    JwtModule.register({
      secret: 'your_secret_key_here', // Provide your secret key here
      signOptions: { expiresIn: '1h' }, // Set expiration time
    }),
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserModel },
      { name: TransactionSchema.name, schema: TransactionModel },
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    TransactionController,
  ],
  providers: [
    AppService,
    UserService,
    Logger,
    AuthService,
    TransactionService,
    JwtStrategy,
  ],
})
export class AppModule {}
