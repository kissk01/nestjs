import { Logger, Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionModel,
  TransactionSchema,
} from 'src/model/schemas/transaction.schema';
import { UserModel, UserSchema } from 'src/model/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionSchema.name, schema: TransactionModel },
      { name: UserSchema.name, schema: UserModel },
    ]),
    ,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, Logger],
})
export class TransactionModule {}
