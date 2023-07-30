import { Test, TestingModule } from '@nestjs/testing';
import { RevolutService } from './revolut.service';
import { HttpModule } from '@nestjs/axios';
import { REVOLUT_TXS } from 'src/common/mocks';

describe('RevolutService', () => {
  let service: RevolutService;
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
      providers: [RevolutService],
    }).compile();

    service = module.get<RevolutService>(RevolutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not return mocked transctions', async () => {
    const transactions = await service.getTransactions();

    expect(transactions).not.toBe(REVOLUT_TXS);
  });

  it('should have common transaction properties', async () => {
    const transactions = await service.getTransactions();

    if (transactions.length > 0)
      expect(Object.keys(transactions[0])).toEqual(TRANSACTION_PROPERTIES);
  });
});
