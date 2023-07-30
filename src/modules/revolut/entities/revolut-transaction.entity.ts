import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency } from 'src/common/enums/currency.enum';
import { TransformNumber } from 'src/common/decorators/transform-number.decorator';

enum RevolutTransactionState {
  COMPLETED = 'COMPLETED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}

class RevolutTransactionAmount {
  @IsNumber()
  @TransformNumber()
  value: number;

  @IsEnum(Currency)
  currency: Currency;
}

class RevolutTransactionCounterParty {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class RevolutTransaction {
  @IsString()
  id: string;

  @IsDateString()
  created_at: string;

  @IsDateString()
  completed_at: string;

  @IsEnum(RevolutTransactionState)
  state: RevolutTransactionState;

  @ValidateNested()
  @Type(() => RevolutTransactionAmount)
  amount: RevolutTransactionAmount;

  @IsOptional()
  @IsString()
  merchant?: string;

  @ValidateNested()
  @Type(() => RevolutTransactionCounterParty)
  counterparty: RevolutTransactionCounterParty;
  reference: string;
}
