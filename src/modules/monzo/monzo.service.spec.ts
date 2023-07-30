import { Test, TestingModule } from '@nestjs/testing';
import { MonzoService } from './monzo.service';
import { HttpModule } from '@nestjs/axios';
import { MONZO_TXS } from 'src/common/mocks';

describe('MonzoService', () => {
  let service: MonzoService;
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
      providers: [MonzoService],
    }).compile();

    service = module.get<MonzoService>(MonzoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not return mocked transctions', async () => {
    const transactions = await service.getTransactions();
    expect(transactions).not.toBe(MONZO_TXS);
  });

  it('should have common transaction properties', async () => {
    const transactions = await service.getTransactions();
    if (transactions.length > 0)
      expect(Object.keys(transactions[0])).toEqual(TRANSACTION_PROPERTIES);
  });
});
