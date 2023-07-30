import { Injectable, Logger } from '@nestjs/common';
import {
  Transaction,
  TransactionSource,
} from 'src/common/entites/transaction.entity';
import { HttpService } from '@nestjs/axios';
import * as nock from 'nock';
import { MONZO_TXS } from 'src/common/mocks';
import { lastValueFrom, map } from 'rxjs';
import { MonzoTransaction } from './entities/monzo-transaction.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ITransactionService } from 'src/common/interfaces/transaction-service.interface';

@Injectable()
export class MonzoService extends ITransactionService {
  private readonly logger = new Logger(MonzoService.name);

  constructor(private readonly httpService: HttpService) {
    super();
    nock('http://api/monzo').get('/transactions').reply(200, {
      data: MONZO_TXS,
    });
  }

  public async getTransactions(): Promise<Transaction[]> {
    const response = this.httpService
      .get('http://api/monzo/transactions')
      .pipe(map((response) => response.data));

    const responseData: MonzoTransaction[] = (await lastValueFrom(response))
      .data;
    const _transactions = plainToInstance(MonzoTransaction, responseData);

    _transactions.forEach(async (transaction) => {
      const errors = await validate(transaction, {
        validationError: { target: false },
      });
      if (errors.length > 0) {
        this.logger.log('Transaction validation failed: ', errors);
      }
    });

    return _transactions.map(this.mapMonzoTransactionToTransaction);
  }

  private mapMonzoTransactionToTransaction(transaction: MonzoTransaction) {
    return {
      id: transaction.id,
      created: transaction.created,
      description: transaction.description,
      amount: {
        value: transaction.amount,
        currency: transaction.currency,
      },
      type: null,
      reference: transaction.metadata.reference,
      metadata: { source: TransactionSource.Monzo },
    } as Transaction;
  }
}
