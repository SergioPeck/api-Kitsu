import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { Public } from 'src/auth/guards/public.decorator';
import type { RankingRange } from './types/rankings.types';

@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Public()
  @Get('mangas/historic')
  getHistoricMangaRanking() {
    return this.rankingsService.getHistoricMangaRanking();
  }

  @Public()
  @Get('mangas')
  async getMangaRanking(@Query('range') range: RankingRange = 'day') {
    if (!['day', 'week', 'month'].includes(range)) {
      throw new BadRequestException('Invalid range');
    }

    return this.rankingsService.getMangaRanking(range);
  }
}
