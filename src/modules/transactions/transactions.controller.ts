import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetTransactionsDto, GetTransactionsParams } from './transactions.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ransactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get transactions from Revolut, Monzo and Sterling Bank APIs',
  })
  async getTransactions(
    @Query() queryParams?: GetTransactionsParams,
  ): Promise<GetTransactionsDto> {
    return this.transactionsService.getTransactions(queryParams);
  }
}
