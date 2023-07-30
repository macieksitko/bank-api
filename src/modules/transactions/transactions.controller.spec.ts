import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { RevolutService } from '../revolut/revolut.service';
import { SterlingBankService } from '../sterling-bank/sterling-bank.service';
import { MonzoService } from '../monzo/monzo.service';
import { HttpModule } from '@nestjs/axios';
import { GetTransactionsParams } from './transactions.dto';
import { TransactionSource } from 'src/common/entites/transaction.entity';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        RevolutService,
        SterlingBankService,
        MonzoService,
      ],
    }).compile();

    controller = app.get<TransactionsController>(TransactionsController);
    service = app.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get transactions', () => {
    it('transaction service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return only Revolut transactions if such source param provided', async () => {
      const params: GetTransactionsParams = {
        source: TransactionSource.Revolut,
      };

      const { transactions } = await controller.getTransactions(params);

      transactions.forEach((transaction) => {
        expect(transaction.metadata.source).toEqual(TransactionSource.Revolut);
      });
    });

    it('should return only Monzo transactions if such source param provided', async () => {
      const params: GetTransactionsParams = {
        source: TransactionSource.Monzo,
      };

      const { transactions } = await controller.getTransactions(params);

      transactions.forEach((transaction) => {
        expect(transaction.metadata.source).toEqual(TransactionSource.Monzo);
      });
    });

    it('should return only Sterling Bank transactions if such source param provided', async () => {
      const params: GetTransactionsParams = {
        source: TransactionSource.SterlingBank,
      };

      const { transactions } = await controller.getTransactions(params);

      transactions.forEach((transaction) => {
        expect(transaction.metadata.source).toEqual(
          TransactionSource.SterlingBank,
        );
      });
    });

    it('should return all transactions if no source param provided', async () => {
      const { transactions } = await controller.getTransactions({});

      transactions.forEach((transaction) => {
        expect(Object.values(TransactionSource)).toContain(
          transaction.metadata.source,
        );
      });
    });
  });
});
