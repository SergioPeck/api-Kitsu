import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './entities/mangas.entity';
import { CreateMangaDto } from './dto/create-mangas.dto';
import { UpdateMangaDto } from './dto/update-mangas.dto';
import { ChapterViewsService } from 'src/chapter-views/chapter-views.service';
import { ChapterListItemDto } from './dto/chapter-list-item.dto';
import {
  RecentMangaItem,
  RecentMangaResponse,
  ChapterRef,
} from '../common/recent-manga.type';
import { Chapter } from 'src/chapters/entities/chapter.entity';

interface RecentMangaRaw {
  manga_id: string;
  manga_title: string;
  manga_slug: string;
  manga_coverImage: string;
  lastChapterAt: Date;
}

interface CountRaw {
  count: string;
}

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepo: Repository<Manga>,
    @InjectRepository(Chapter)
    private chapterRepo: Repository<Chapter>,

    private chapterViewsService: ChapterViewsService,
  ) {}

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(dto: CreateMangaDto) {
    const baseSlug = this.generateSlug(dto.title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.mangaRepo.exists({ where: { slug } })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const manga = this.mangaRepo.create({
      ...dto,
      slug,
    });

    return this.mangaRepo.save(manga);
  }

  findAll() {
    return this.mangaRepo.find({
      relations: ['chapters'],
    });
  }

  async findOne(slug: string) {
    const manga = await this.mangaRepo.findOne({
      where: { slug },
    });

    if (!manga) throw new NotFoundException('Manga not found');
    return manga;
  }

  async getChaptersByManga(slug: string): Promise<ChapterListItemDto[] | null> {
    const manga = await this.mangaRepo.findOne({
      where: { slug },
      select: ['id'],
    });

    if (!manga) return null;

    const entities = await this.chapterRepo.find({
      where: { manga: { id: manga.id } },
      order: { chapterNumber: 'ASC' },
      select: ['id', 'chapterNumber', 'title'],
    });

    const chapters: ChapterListItemDto[] = entities.map((c) => ({
      id: c.id,
      chapterNumber: c.chapterNumber,
      title: c.title,
    }));

    return chapters;
  }

  async getRecentlyUpdated() {
    return this.mangaRepo.find({
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        lastChapterAt: true,
      },
      order: {
        lastChapterAt: 'DESC',
      },
      take: 12,
    });
  }

  async getRecentMangas(page = 1, limit = 10): Promise<RecentMangaResponse> {
    const offset = (page - 1) * limit;

    const mangas = await this.mangaRepo
      .createQueryBuilder('manga')
      .innerJoin('manga.chapters', 'chapter')
      .select([
        'manga.id AS manga_id',
        'manga.title AS manga_title',
        'manga.slug AS manga_slug',
        'manga.coverImage AS "manga_coverImage"',
        'MAX(chapter.createdAt) AS "lastChapterAt"',
      ])
      .groupBy('manga.id')
      .orderBy('"lastChapterAt"', 'DESC')
      .offset(offset)
      .limit(limit)
      .getRawMany<RecentMangaRaw>();

    const total = await this.mangaRepo
      .createQueryBuilder('manga')
      .innerJoin('manga.chapters', 'chapter')
      .select('COUNT(DISTINCT manga.id)', 'count')
      .getRawOne<CountRaw>();

    const mangaIds: string[] = mangas.map((m) => m.manga_id);

    if (mangaIds.length === 0) {
      return { items: [], page, hasMore: false };
    }

    const firstChapters = await this.chapterRepo
      .createQueryBuilder('chapter')
      .select(['chapter.id', 'chapter.chapterNumber', 'chapter.mangaId'])
      .where('chapter.mangaId IN (:...ids)', { ids: mangaIds })
      .orderBy('chapter.chapterNumber', 'ASC')
      .getMany();

    const firstChapterMap = new Map<string, ChapterRef>();

    for (const ch of firstChapters) {
      if (!firstChapterMap.has(ch.mangaId)) {
        firstChapterMap.set(ch.mangaId, {
          id: ch.id,
          chapterNumber: ch.chapterNumber,
        });
      }
    }

    const lastChaptersRaw = await this.chapterRepo
      .createQueryBuilder('chapter')
      .select(['chapter.id', 'chapter.chapterNumber', 'chapter.mangaId'])
      .where('chapter.mangaId IN (:...ids)', { ids: mangaIds })
      .orderBy('chapter.chapterNumber', 'DESC')
      .getMany();

    const lastChaptersMap = new Map<string, ChapterRef[]>();

    for (const ch of lastChaptersRaw) {
      const list = lastChaptersMap.get(ch.mangaId) ?? [];

      if (list.length < 2) {
        list.push({
          id: ch.id,
          chapterNumber: ch.chapterNumber,
        });
        lastChaptersMap.set(ch.mangaId, list);
      }
    }

    const items: RecentMangaItem[] = mangas.map((m) => ({
      id: m.manga_id,
      title: m.manga_title,
      slug: m.manga_slug,
      coverImage: m.manga_coverImage,
      firstChapter: firstChapterMap.get(m.manga_id) ?? null,
      lastChapters: lastChaptersMap.get(m.manga_id) ?? [],
      lastChapterAt: m.lastChapterAt,
    }));

    return {
      items,
      page,
      hasMore: page * limit < Number(total?.count ?? 0),
    };
  }

  async update(slug: string, dto: UpdateMangaDto) {
    const manga = await this.findOne(slug);
    Object.assign(manga, dto);
    return this.mangaRepo.save(manga);
  }

  async remove(slug: string) {
    const manga = await this.findOne(slug);
    return this.mangaRepo.remove(manga);
  }

  async getMonthlyViews(slug: string) {
    const manga = await this.mangaRepo.findOne({
      where: { slug },
      relations: ['chapters'],
    });

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    const chapterIds = manga.chapters.map((ch) => ch.id);
    return this.chapterViewsService.getMonthlyViewsForManga(chapterIds);
  }
}
