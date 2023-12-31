import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CurrencyCode } from 'src/common/enums/currency.enum';
import { Type } from 'class-transformer';
import { TransformNumber } from 'src/common/decorators/transform-number.decorator';

class MonzoTransactionMetadata {
  @IsString()
  reference: string;
}

export class MonzoTransaction {
  @IsString()
  id: string;

  @IsDateString()
  created: string;

  @IsString()
  description: string;

  @IsNumber()
  @TransformNumber()
  amount: number;

  @IsEnum(CurrencyCode)
  currency: CurrencyCode;

  @ValidateNested()
  @Type(() => MonzoTransactionMetadata)
  metadata: MonzoTransactionMetadata;
}
