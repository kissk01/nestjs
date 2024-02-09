import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TransactionDocument } from 'src/model/schemas/transaction.schema';
import { AcceptRejectRequestDto } from 'src/model/transaction/dto/accept-reject-request.dto';
import { CreateTransactionDto } from 'src/model/transaction/dto/create-transaction.dto';
import { RequestMoneyDto } from 'src/model/transaction/dto/request-money.dto';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/user/user.decorator';
import { UserTokenPayloadDto } from 'src/model/dto/user.token.payload.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @AuthUser() user: UserTokenPayloadDto,
  ): Promise<TransactionDocument> {
    return this.transactionService.createTransaction(
      createTransactionDto,
      user,
    );
  }

  @Get('history')
  @UseGuards(AuthGuard('jwt'))
  async getTransactionsHistory(
    @AuthUser() user: UserTokenPayloadDto,
  ): Promise<TransactionDocument[]> {
    return this.transactionService.getTransactionsHistory(user);
  }

  @Post('request')
  @UseGuards(AuthGuard('jwt'))
  async requestMoney(
    @AuthUser() user: UserTokenPayloadDto,
    @Body() requestMoneyDto: RequestMoneyDto,
  ): Promise<TransactionDocument> {
    return this.transactionService.requestMoney(requestMoneyDto, user);
  }

  @Put('request/:requestId')
  @UseGuards(AuthGuard('jwt'))
  async acceptRejectRequest(
    @AuthUser() user: UserTokenPayloadDto,
    @Param('requestId') requestId: string,
    @Body() acceptRejectRequestDto: AcceptRejectRequestDto,
  ): Promise<AcceptRejectRequestDto['action']> {
    const { action } = acceptRejectRequestDto;
    return this.transactionService.acceptRejectRequest(requestId, action, user);
  }
}
