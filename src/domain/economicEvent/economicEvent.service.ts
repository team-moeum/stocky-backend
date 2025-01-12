import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { EconomicEvent } from './economicEvent.entity';

@Injectable()
export class EconomicEventService {
  constructor(
    @InjectRepository(EconomicEvent)
    private economicEventRepository: Repository<EconomicEvent>,
  ) {}

  async findAll({
    country,
    impact,
    startDate,
    endDate,
  }: {
    country?: string;
    impact?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (country) {
      where.country = country;
    }

    if (impact) {
      where.impact = impact;
    }

    if (startDate && endDate) {
      where.time = Between(startDate, endDate);
    }

    return this.economicEventRepository.find({
      where,
      order: { time: 'DESC' },
    });
  }
}
