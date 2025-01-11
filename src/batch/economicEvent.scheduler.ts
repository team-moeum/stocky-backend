import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { EconomicEvent } from 'src/domain/economicEvent/economicEvent.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

type EconomicEventResponse = {
  name: string;
  time: number;
  impact: 'low' | 'medium' | 'high';
  country_iso: string;
  actual: string | null;
  previous: string | null;
  estimate: string | null;
  event_type: string;
  has_desc: boolean;
  currency: string;
};

@Injectable()
export class EconomicEventScheduler {
  private readonly logger = new Logger(EconomicEventScheduler.name);
  private readonly countries = ['US', 'KR'];

  constructor(
    @InjectRepository(EconomicEvent)
    private economicEventRepository: Repository<EconomicEvent>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  // 3시간 주기
  @Cron('0 0 */3 * * *')
  async scheduledFetchEconomicEvents() {
    this.logger.debug('update economic_calendar table');

    for (const country of this.countries) {
      try {
        await this.updateEconomicEvents(country);
      } catch (error) {
        this.logger.error(`Failed for country ${country}:`, error);
      }
    }
  }

  private async updateEconomicEvents(country: string) {
    try {
      const apiKey = this.configService.get<string>('API_KEY_PROFIT');

      if (!apiKey) {
        throw new Error(
          'API_KEY_PROFIT is not defined in environment variables',
        );
      }

      // 데이터 패칭
      const { data } = await firstValueFrom(
        this.httpService
          .get<EconomicEventResponse[]>(
            'https://api.profit.com/data-api/economic_calendar/forex',
            {
              params: {
                sort_order: 'asc',
                limit: 100,
                skip: 0,
                token: apiKey,
                start_date: new Date().toISOString().split('T')[0],
                country_iso: country,
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                'Error fetching economic events:',
                error.response?.data,
              );
              throw 'An error happened while fetching economic events';
            }),
          ),
      );

      // 데이터 저장
      for (const event of data) {
        await this.economicEventRepository
          .createQueryBuilder()
          .insert()
          .into(EconomicEvent)
          .values({
            time: new Date(event.time * 1000),
            name: event.name,
            impact: event.impact,
            country: event.country_iso,
            actual: this.parseNumberOrNull(event.actual),
            previous: this.parseNumberOrNull(event.previous),
            estimate: this.parseNumberOrNull(event.estimate),
          })
          .orUpdate(
            ['actual', 'previous', 'estimate'], // 업데이트할 컬럼들
            ['time', 'name'], // unique constraint 컬럼들
            { skipUpdateIfNoValuesChanged: true }, // 옵션
          )
          .execute();
      }

      this.logger.log(`Economic events successfully updated: ${country}`);
    } catch (error) {
      this.logger.error(`Failed to fetch economic events: ${country}`, error);
      throw error;
    }
  }

  private parseNumberOrNull(value: string | null): number | null {
    if (value === null || value === '') {
      return null;
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
}
