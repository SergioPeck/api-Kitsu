import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { ChapterView } from './entities/chapter-view.entity';
import { CreateChapterViewDto } from './dto/create-chapter-view.dto';

@Injectable()
export class ChapterViewsService {
  constructor(
    @InjectRepository(ChapterView)
    private viewsRepository: Repository<ChapterView>,
  ) {}

  // Registrar una vista
  create(dto: CreateChapterViewDto) {
    const view = this.viewsRepository.create({
      chapterId: dto.chapterId,
      createdAt: new Date(),
    });

    return this.viewsRepository.save(view);
  }

  // Obtener vistas de un capítulo en los últimos 30 días
  getMonthlyViewsForChapter(chapterId: string) {
    return this.viewsRepository.count({
      where: {
        chapterId,
        createdAt: MoreThan(this.thirtyDaysAgo()),
      },
    });
  }

  // 🔥 Obtener vistas mensuales para TODOS los capítulos de un manga
  async getMonthlyViewsForManga(chapterIds: string[]) {
    return this.viewsRepository.count({
      where: {
        chapterId: In(chapterIds),
        createdAt: MoreThan(this.thirtyDaysAgo()),
      },
    });
  }

  private thirtyDaysAgo() {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }
}
