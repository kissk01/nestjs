// user.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from 'src/model/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string): Promise<UserDocument> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      salt,
    });
    const savedUser: UserDocument = await newUser.save();
    this.logger.log(' savedUser : ', { savedUser });
    return savedUser;
  }

  async saveRefreshToken(user: UserDocument): Promise<UserDocument> {
    const userWithRefreshToken = new this.userModel(user);
    const saved = await userWithRefreshToken.save();
    return saved;
  }

  async validatePassword(
    user: UserDocument,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
