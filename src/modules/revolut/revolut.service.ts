import { Injectable, Logger } from '@nestjs/common';
import { RevolutTransaction } from './entities/revolut-transaction.entity';
import { HttpService } from '@nestjs/axios';
import * as nock from 'nock';
import { REVOLUT_TXS } from 'src/common/mocks';
import {
  Transaction,
  TransactionSource,
  assignTransactionType,
} from 'src/common/entites/transaction.entity';
import { lastValueFrom, map } from 'rxjs';
import { CurrencyCode } from 'src/common/enums/currency.enum';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ITransactionService } from 'src/common/interfaces/transaction-service.interface';

const NOCK_API = 'http://api/revolut';
const GET_NOCK_API_TRANSACTIONS = NOCK_API + '/transactions';

@Injectable()
export class RevolutService extends ITransactionService {
  private readonly logger = new Logger(RevolutService.name);

  constructor(private readonly httpService: HttpService) {
    super();
    nock(NOCK_API).get('/transactions').reply(200, {
      data: REVOLUT_TXS,
    });
  }

  public async getTransactions(): Promise<Transaction[]> {
    const response = this.httpService
      .get(GET_NOCK_API_TRANSACTIONS)
      .pipe(map((response) => response.data));

    const responseData: RevolutTransaction[] = (await lastValueFrom(response))
      .data;

    const _transactions = plainToInstance(RevolutTransaction, responseData);

    if (_transactions.length <= 0) return [];

    _transactions.forEach(async (transaction) => {
      const errors = await validate(transaction, {
        validationError: { target: false },
      });
      if (errors.length > 0) {
        this.logger.log('Transaction validation failed: ', errors);
      }
    });

    return _transactions.map(this.mapRevolutTransactionToTransaction);
  }

  private mapRevolutTransactionToTransaction(transaction: RevolutTransaction) {
    return {
      id: transaction.id,
      created: transaction.created_at,
      description: 'Payment to ' + transaction.counterparty.name,
      amount: {
        value: Number(transaction.amount.value),
        currency: CurrencyCode[transaction.amount.currency],
      },
      type: assignTransactionType(transaction.amount.value),
      reference: transaction.reference,
      metadata: { source: TransactionSource.Revolut },
    } as Transaction;
  }
}
