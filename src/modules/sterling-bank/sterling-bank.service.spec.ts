import { Test, TestingModule } from '@nestjs/testing';
import { SterlingBankService } from './sterling-bank.service';
import { HttpModule } from '@nestjs/axios';
import { STERLING_TXS } from 'src/common/mocks';

describe('SterlingBankService', () => {
  let service: SterlingBankService;
  const TRANSACTION_PROPERTIES = [
    'id',
    'created',
    'description',
    'amount',
    'type',
    'reference',
    'metadata',
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SterlingBankService],
    }).compile();

    service = module.get<SterlingBankService>(SterlingBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not return mocked transctions', async () => {
    const transactions = await service.getTransactions();

    expect(transactions).not.toBe(STERLING_TXS);
  });

  it('should have common transaction properties', async () => {
    const transactions = await service.getTransactions();

    if (transactions.length > 0)
      expect(Object.keys(transactions[0])).toEqual(TRANSACTION_PROPERTIES);
  });
});
