import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EconomicEventService } from './economicEvent.service';
import { EconomicEvent } from './economicEvent.entity';

@ApiTags('economic-events')
@Controller('economic-events')
export class EconomicEventController {
  constructor(private readonly economicEventService: EconomicEventService) {}

  @Get()
  @ApiOperation({ summary: '경제 이벤트 조회' })
  @ApiQuery({ name: 'country', required: false, description: '국가 코드' })
  @ApiQuery({
    name: 'impact',
    required: false,
    enum: ['low', 'medium', 'high'],
    description: '영향도',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: Date,
    description: '시작 날짜',
  })
  @ApiResponse({ status: 200, description: '조회 성공', type: [EconomicEvent] })
  async findAll(
    @Query('country') country?: string,
    @Query('impact') impact?: 'low' | 'medium' | 'high',
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.economicEventService.findAll({
      country,
      impact,
      startDate,
      endDate,
    });
  }
}
