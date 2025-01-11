// batch.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { EconomicEvent } from 'src/domain/economicEvent/economicEvent.entity';
import { EconomicEventScheduler } from './economicEvent.scheduler';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([EconomicEvent])],
  providers: [EconomicEventScheduler],
})
export class BatchModule {}
