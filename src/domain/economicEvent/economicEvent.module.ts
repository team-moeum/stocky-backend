import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EconomicEvent } from './economicEvent.entity';
import { EconomicEventController } from './economicEvent.controller';
import { EconomicEventService } from './economicEvent.service';

@Module({
  imports: [TypeOrmModule.forFeature([EconomicEvent])],
  controllers: [EconomicEventController],
  providers: [EconomicEventService],
})
export class EconomicEventModule {}
