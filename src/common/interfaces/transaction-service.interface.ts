import { Transaction } from '../entites/transaction.entity';

export abstract class ITransactionService {
  public abstract getTransactions(): Promise<Transaction[]>;
}
