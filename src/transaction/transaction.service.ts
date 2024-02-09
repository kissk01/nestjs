import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { ClientSession, Model } from 'mongoose';
import { UserTokenPayloadDto } from 'src/model/dto/user.token.payload.dto';
import {
  TransactionDocument,
  TransactionSchema,
} from 'src/model/schemas/transaction.schema';
import { UserDocument, UserSchema } from 'src/model/schemas/user.schema';
import { AcceptRejectRequestDto } from 'src/model/transaction/dto/accept-reject-request.dto';
import { CreateTransactionDto } from 'src/model/transaction/dto/create-transaction.dto';
import { RequestMoneyDto } from 'src/model/transaction/dto/request-money.dto';
import { SaveTransactionDto } from 'src/model/transaction/dto/save-transaction.dto';
import { UpdateBalanceDto } from 'src/model/transaction/dto/update-balance.dto';

@Injectable()
export class TransactionService {
  private session: ClientSession;
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: UserTokenPayloadDto,
  ): Promise<TransactionDocument> {
    this.session = await this.userModel.db.startSession();
    this.session.startTransaction();
    try {
      const senderUser = await this.userModel.findOne({ email: user.email });
      senderUser.balance = senderUser.balance - createTransactionDto.amount;
      if (senderUser.balance < 0) {
        throw error('insufficient balance');
      }
      await senderUser.save({ session: this.session });
      this.logger.log(' session saved ');
      await this.updateUserBalanceByEmail({
        email: createTransactionDto.recipientEmail,
        amount: createTransactionDto.amount,
      });
      this.logger.log(' balance updated ');

      const newTransaction = await this.saveTransaction({
        senderEmail: user.email,
        recipientEmail: createTransactionDto.recipientEmail,
        amount: createTransactionDto.amount,
      });
      this.logger.log(' transaction saved ');

      await this.session.commitTransaction();
      return newTransaction;
    } catch (error) {
      await this.session.abortTransaction();
      throw error;
    } finally {
      this.session.endSession();
    }
  }

  async getTransactionsHistory(
    user: UserTokenPayloadDto,
  ): Promise<TransactionDocument[]> {
    const userID = user.email;
    this.logger.log(' userId ', userID);
    this.logger.log(userID);
    const transactions = await this.transactionModel
      .find({
        $or: [{ recipientUserId: userID }, { senderUserId: userID }],
      })
      .exec();
    return transactions;
  }

  async requestMoney(
    requestMoneyDto: RequestMoneyDto,
    user: UserTokenPayloadDto,
  ): Promise<TransactionDocument> {
    const newTransaction = new this.transactionModel({
      amount: requestMoneyDto.amount,
      senderUserId: user.email,
      recipientUserId: requestMoneyDto.recipientEmail,
      isRequest: true,
      isAccepted: false,
      isRejected: false,
    });
    await newTransaction.save();
    return newTransaction;
    // Implement logic to request money
  }

  async saveTransaction(
    savePayload: SaveTransactionDto,
  ): Promise<TransactionDocument> {
    const newTransaction = new this.transactionModel({
      amount: savePayload.amount,
      senderUserId: savePayload.senderEmail,
      recipientUserId: savePayload.recipientEmail,
    });
    this.logger.log({ newTransaction });
    await newTransaction.save({ session: this.session });

    return newTransaction;
  }

  async updateUserBalanceByEmail(
    updatePayload: UpdateBalanceDto,
  ): Promise<void> {
    await this.userModel.updateOne(
      { email: updatePayload.email },
      { $inc: { balance: updatePayload.amount } },
      { session: this.session },
    );
  }

  async acceptRejectRequest(
    requestId: string,
    action: AcceptRejectRequestDto['action'],
    user: UserTokenPayloadDto,
  ): Promise<AcceptRejectRequestDto['action']> {
    this.session = await this.userModel.db.startSession();
    this.session.startTransaction();
    try {
      const moneyRequest = await this.transactionModel.findById(requestId);
      if (!moneyRequest) {
        throw new Error('Money request not found, invalid _id');
      }
      if (!moneyRequest.isRequest) {
        throw new Error('Its not a money request!');
      }
      if (moneyRequest.isAccepted) {
        throw new Error('Money request is already accepted');
      }
      if (moneyRequest.isRejected) {
        throw new Error('Money request is already rejected');
      }

      if (action === 'reject') {
        moneyRequest.isRejected = true;
      } else {
        const acceptUser = await this.userModel.findOne({ email: user.email });
        if (acceptUser.balance - moneyRequest.amount < 0) {
          throw new Error('insufficient balance');
        }
        await this.updateUserBalanceByEmail({
          email: user.email,
          amount: -moneyRequest.amount,
        });
        await this.updateUserBalanceByEmail({
          email: moneyRequest.senderUserId,
          amount: moneyRequest.amount,
        });
        moneyRequest.isAccepted = true;
      }
      await moneyRequest.save({ session: this.session });
      await this.session.commitTransaction();
      return action;
    } catch (error) {
      this.logger.log(' before abort transaction');
      this.logger.log(error);
      await this.session.abortTransaction();
      //throw new Error('Transaction failed: ' + error);
      let errorMessage = 'Internal server error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      this.session.endSession();
    }
  }
}
