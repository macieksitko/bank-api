import { Currency } from '../enums/currency.enum';

export class Transaction {
  id: string;
  created: string;
  description: string;
  amount: TransactionAmount;
  type: TransactionType;
  reference: string;
  metadata: TransactionMetadata;
}

export enum TransactionType {
  Debit = 'DEBIT',
  Credit = 'CREDIT',
}

export type TransactionAmount = {
  value: number;
  currency: Currency;
};

export enum TransactionSource {
  Revolut = 'REVOLUT',
  SterlingBank = 'STERLING_BANK',
  Monzo = 'MONZO',
}

export type TransactionMetadata = {
  source: string;
};
