// transaction.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export type TransactionDocument = TransactionSchema & Document;

@Schema({ timestamps: true })
export class TransactionSchema {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  senderUserId: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  recipientUserId: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  @IsBoolean()
  isRequest: boolean; // Indicates if it's a request transaction

  @Prop({ default: false })
  @IsBoolean()
  isAccepted: boolean; // Indicates if the request is accepted by the recipient

  @Prop({ default: false })
  @IsBoolean()
  isRejected: boolean; // Indicates if the request is rejected by the recipient
}

export const TransactionModel = SchemaFactory.createForClass(TransactionSchema);
