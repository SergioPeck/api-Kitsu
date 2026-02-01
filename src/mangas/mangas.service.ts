import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './entities/mangas.entity';
import { CreateMangaDto } from './dto/create-mangas.dto';
import { UpdateMangaDto } from './dto/update-mangas.dto';
import { ChapterViewsService } from 'src/chapter-views/chapter-views.service';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepo: Repository<Manga>,
    private chapterViewsService: ChapterViewsService,
  ) {}

  create(dto: CreateMangaDto) {
    const manga = this.mangaRepo.create(dto);
    return this.mangaRepo.save(manga);
  }

  findAll() {
    return this.mangaRepo.find({
      relations: ['chapters'],
    });
  }

  async findOne(id: string) {
    const manga = await this.mangaRepo.findOne({
      where: { id },
      relations: ['chapters'],
    });

    if (!manga) throw new NotFoundException('Manga not found');
    return manga;
  }

  async getRecentlyUpdated() {
    return this.mangaRepo.find({
      order: {
        lastChapterAt: 'DESC',
      },
      take: 10,
    });
  }

  async update(id: string, dto: UpdateMangaDto) {
    const manga = await this.findOne(id);
    Object.assign(manga, dto);
    return this.mangaRepo.save(manga);
  }

  async remove(id: string) {
    const manga = await this.findOne(id);
    return this.mangaRepo.remove(manga);
  }

  async getMonthlyViews(mangaId: string) {
    const manga = await this.mangaRepo.findOne({
      where: { id: mangaId },
      relations: ['chapters'],
    });

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }
    const chapterIds = manga.chapters.map((ch) => ch.id);

    return this.chapterViewsService.getMonthlyViewsForManga(chapterIds);
  }
}
