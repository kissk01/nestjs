import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsPositive } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = UserSchema & Document;
export type HydratedUserDocument = HydratedDocument<UserSchema>;

@Schema()
export class UserSchema {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  password: string;

  @Prop({ required: true })
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  salt: string;

  @Prop()
  refreshToken: string;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive()
  balance: number;
}

export const UserModel = SchemaFactory.createForClass(UserSchema);
