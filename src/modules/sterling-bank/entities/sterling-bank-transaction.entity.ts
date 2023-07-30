import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { Currency } from 'src/common/enums/currency.enum';
import { TransformNumber } from 'src/common/decorators/transform-number.decorator';

enum SterlingBankTransactionDirection {
  OUT = 'OUT',
  IN = 'IN',
}

export class SterlingBankTransaction {
  @IsString()
  id: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsNumber()
  @TransformNumber()
  amount: number;

  @IsEnum(SterlingBankTransactionDirection)
  direction: SterlingBankTransactionDirection;

  @IsString()
  narrative: string;

  @IsDateString()
  created: string;

  @IsString()
  reference: string;
}
