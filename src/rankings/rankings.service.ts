import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from 'src/mangas/entities/mangas.entity';
import { Repository } from 'typeorm';
import { MangaHistoricRankingDto } from './dto/manga-historic-ranking.dto';
import { RankingRange } from './types/rankings.types';
import { ChapterView } from 'src/chapter-views/entities/chapter-view.entity';

type MangaHistoricRankingRaw = {
  id: string;
  title: string;
  coverImage: string;
  views: string;
};

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(ChapterView)
    private readonly viewRepository: Repository<ChapterView>,
  ) {}

  async getHistoricMangaRanking(): Promise<{
    items: MangaHistoricRankingDto[];
  }> {
    const result = await this.mangaRepository
      .createQueryBuilder('manga')
      .leftJoin('manga.chapters', 'chapter')
      .leftJoin('chapter.views', 'view')
      .select('manga.id', 'id')
      .addSelect('manga.title', 'title')
      .addSelect('manga.coverImage', 'coverImage')
      .addSelect('COUNT(view.id)', 'views')
      .groupBy('manga.id')
      .orderBy('views', 'DESC')
      .limit(10)
      .getRawMany<MangaHistoricRankingRaw>();

    const items: MangaHistoricRankingDto[] = result.map((row) => ({
      id: row.id,
      title: row.title,
      coverImage: row.coverImage,
      views: Number(row.views),
    }));

    return { items };
  }

  async getMangaRanking(range: RankingRange) {
    const fromDate = this.getFromDate(range);

    const qb = this.viewRepository
      .createQueryBuilder('view')
      .innerJoin('view.chapter', 'chapter')
      .innerJoin('chapter.manga', 'manga')
      .select('manga.id', 'id')
      .addSelect('manga.title', 'title')
      .addSelect('manga.coverImage', 'coverImage')
      .addSelect('COUNT(view.id)', 'views')
      .where('view.createdAt >= :fromDate', { fromDate })
      .groupBy('manga.id')
      .orderBy('views', 'DESC')
      .limit(10);

    const items =
      (await qb.getRawMany()) as unknown as MangaHistoricRankingRaw[];

    return {
      range,
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        coverImage: item.coverImage,
        views: Number(item.views),
      })),
    };
  }

  private getFromDate(range: RankingRange): Date {
    const now = new Date();

    switch (range) {
      case 'day':
        now.setDate(now.getDate() - 1);
        break;
      case 'week':
        now.setDate(now.getDate() - 7);
        break;
      case 'month':
        now.setMonth(now.getMonth() - 1);
        break;
    }

    return now;
  }
}
