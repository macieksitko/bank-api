import { Module } from '@nestjs/common';
import { RevolutService } from './revolut.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RevolutService],
  exports: [RevolutService],
})
export class RevolutModule {}
