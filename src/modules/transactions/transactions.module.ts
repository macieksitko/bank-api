import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { RevolutService } from '../revolut/revolut.service';
import { SterlingBankService } from '../sterling-bank/sterling-bank.service';
import { MonzoService } from '../monzo/monzo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    RevolutService,
    SterlingBankService,
    MonzoService,
  ],
})
export class TransactionsModule {}
