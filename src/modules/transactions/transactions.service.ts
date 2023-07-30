import { Injectable } from '@nestjs/common';
import { GetTransactionsDto, GetTransactionsParams } from './transactions.dto';
import { isEmpty } from 'class-validator';
import { MonzoService } from '../monzo/monzo.service';
import { RevolutService } from '../revolut/revolut.service';
import { SterlingBankService } from '../sterling-bank/sterling-bank.service';
import {
  Transaction,
  TransactionSource,
} from 'src/common/entites/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly monzoService: MonzoService,
    private readonly revolutService: RevolutService,
    private readonly sterlingBankService: SterlingBankService,
  ) {}
  public async getTransactions(
    params: GetTransactionsParams,
  ): Promise<GetTransactionsDto> {
    const transactions: Transaction[] = [];
    if (isEmpty(params.source) || params.source === TransactionSource.Monzo) {
      transactions.push(...(await this.monzoService.getTransactions()));
    }

    if (isEmpty(params.source) || params.source === TransactionSource.Revolut) {
      transactions.push(...(await this.revolutService.getTransactions()));
    }

    if (
      isEmpty(params.source) ||
      params.source === TransactionSource.SterlingBank
    ) {
      transactions.push(...(await this.sterlingBankService.getTransactions()));
    }

    return {
      transactions,
    };
  }
}
