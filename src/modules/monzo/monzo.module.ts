import { Module } from '@nestjs/common';
import { MonzoService } from './monzo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MonzoService],
  exports: [MonzoService],
})
export class MonzoModule {}
