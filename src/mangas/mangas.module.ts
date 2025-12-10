import { Module } from '@nestjs/common';
import { MangaService } from './mangas.service';
import { MangaController } from './mangas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './entities/mangas.entity';
import { ChapterViewsModule } from '../chapter-views/chapter-views.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manga]), ChapterViewsModule],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {}
