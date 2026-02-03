import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Manga } from 'src/mangas/entities/mangas.entity';
import { ChapterReaderResponse } from './types/chapter-reader-response';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepo: Repository<Chapter>,

    @InjectRepository(Manga)
    private mangaRepo: Repository<Manga>,
  ) {}

  async create(dto: CreateChapterDto) {
    const chapter = this.chapterRepo.create(dto);
    const savedChapter = await this.chapterRepo.save(chapter);

    const manga = await this.mangaRepo.findOne({
      where: { id: dto.mangaId },
    });

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    manga.lastChapterAt = savedChapter.createdAt;
    await this.mangaRepo.save(manga);

    return savedChapter;
  }

  findAll() {
    return this.chapterRepo.find();
  }
  async getChapterWithNavigation(
    chapterId: string,
  ): Promise<ChapterReaderResponse> {
    const chapter = await this.chapterRepo.findOne({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }

    const { mangaId, chapterNumber } = chapter;

    const prevChapter = await this.chapterRepo.findOne({
      where: {
        mangaId,
        chapterNumber: LessThan(chapterNumber),
      },
      order: { chapterNumber: 'DESC' },
      select: ['id'],
    });

    const nextChapter = await this.chapterRepo.findOne({
      where: {
        mangaId,
        chapterNumber: MoreThan(chapterNumber),
      },
      order: { chapterNumber: 'ASC' },
      select: ['id'],
    });

    const chapters = await this.chapterRepo.find({
      where: { mangaId },
      order: { chapterNumber: 'ASC' },
      select: ['id', 'chapterNumber'],
    });

    return {
      id: chapter.id,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      images: chapter.images,
      mangaId: chapter.mangaId,
      prevChapterId: prevChapter?.id ?? null,
      nextChapterId: nextChapter?.id ?? null,
      chapters,
    };
  }
  async findOne(id: string) {
    const chapter = await this.chapterRepo.findOne({ where: { id } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async update(id: string, dto: UpdateChapterDto) {
    const chapter = await this.findOne(id);
    Object.assign(chapter, dto);
    return this.chapterRepo.save(chapter);
  }

  async remove(id: string) {
    const chapter = await this.findOne(id);
    return this.chapterRepo.remove(chapter);
  }
}
