import {
  Transaction,
  TransactionSource,
} from 'src/common/entites/transaction.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { TransformToUppercase } from 'src/common/decorators/transform-to-uppercase.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTransactionsParams {
  @ApiProperty({ required: false, enum: TransactionSource })
  @TransformToUppercase()
  @IsEnum(TransactionSource)
  @IsOptional()
  source?: TransactionSource;
}

export type GetTransactionsDto = {
  transactions: Transaction[];
};
