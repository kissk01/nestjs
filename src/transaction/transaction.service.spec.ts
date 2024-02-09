import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TransactionDocument,
  TransactionModel,
  TransactionSchema,
} from 'src/model/schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import {
  UserDocument,
  UserModel,
  UserSchema,
} from 'src/model/schemas/user.schema';
import { Logger } from '@nestjs/common';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/test/test-util';
import { UpdateBalanceDto } from 'src/model/transaction/dto/update-balance.dto';

describe('TransactionService', () => {
  let service: TransactionService;

  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: TransactionSchema.name, schema: TransactionModel },
          { name: UserSchema.name, schema: UserModel },
        ]),
      ],
      providers: [TransactionService, Logger],
    }).compile();
    userModel = module.get<Model<UserDocument>>(getModelToken(UserSchema.name));
    service = module.get<TransactionService>(TransactionService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe('service is available', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('should check user balance update by email', () => {
    // Mock data
    const updatePayload: UpdateBalanceDto = {
      email: 'test@example.com',
      amount: 100,
    };

    const createUser = async () => {
      return await userModel.create({
        email: 'test@example.com',
        balance: 0,
        salt: 'fssdf',
        name: 'fsfsda',
        password: 'pass',
      });
    };
    it('should return void', async () => {
      await createUser();

      const userBalanceResult =
        await service.updateUserBalanceByEmail(updatePayload);
      expect(userBalanceResult).toBeUndefined(); // Check if the function returns void
    });

    it('should update balance correctly', async () => {
      await createUser();
      await service.updateUserBalanceByEmail(updatePayload);
      const updatedUser = await userModel.findOne({
        email: 'test@example.com',
      });
      expect(updatedUser.balance).toBe(100);
    });
  });
});
