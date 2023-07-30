import { Injectable, Logger } from '@nestjs/common';
import { SterlingBankTransaction } from './entities/sterling-bank-transaction.entity';
import { HttpService } from '@nestjs/axios';
import {
  Transaction,
  TransactionSource,
} from 'src/common/entites/transaction.entity';
import { STERLING_TXS } from 'src/common/mocks';
import { lastValueFrom, map } from 'rxjs';
import * as nock from 'nock';
import { Currency } from 'src/common/enums/currency.enum';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ITransactionService } from 'src/common/interfaces/transaction-service.interface';

const NOCK_API = 'http://api/sterling-bank';
const GET_NOCK_API_TRANSACTIONS = NOCK_API + '/transactions';

@Injectable()
export class SterlingBankService extends ITransactionService {
  private readonly logger = new Logger(SterlingBankService.name);

  constructor(private readonly httpService: HttpService) {
    super();
    nock(NOCK_API).get('/transactions').reply(200, {
      data: STERLING_TXS,
    });
  }

  public async getTransactions(): Promise<Transaction[]> {
    const response = this.httpService
      .get(GET_NOCK_API_TRANSACTIONS)
      .pipe(map((response) => response.data));

    const responseData: SterlingBankTransaction[] = (
      await lastValueFrom(response)
    ).data;

    const _transactions = plainToInstance(
      SterlingBankTransaction,
      responseData,
    );

    _transactions.forEach(async (transaction) => {
      const errors = await validate(transaction, {
        validationError: { target: false },
      });
      if (errors.length > 0) {
        this.logger.log('Transaction validation failed: ', errors);
      }
    });

    return _transactions.map(this.mapSterlingBankTransactionToTransaction);
  }

  private mapSterlingBankTransactionToTransaction(
    transaction: SterlingBankTransaction,
  ) {
    return {
      id: transaction.id,
      created: transaction.created,
      description: transaction.narrative,
      amount: {
        value: Number(transaction.amount),
        currency: Currency[transaction.currency],
      },
      type: null,
      reference: transaction.reference,
      metadata: { source: TransactionSource.SterlingBank },
    } as Transaction;
  }
}
