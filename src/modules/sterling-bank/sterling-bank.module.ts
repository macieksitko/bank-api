import { Module } from '@nestjs/common';
import { SterlingBankService } from './sterling-bank.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SterlingBankService],
  exports: [SterlingBankService],
})
export class SterlingBankModule {}
