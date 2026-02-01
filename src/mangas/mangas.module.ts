import { Module } from '@nestjs/common';
import { MangaService } from './mangas.service';
import { MangaController } from './mangas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './entities/mangas.entity';
import { ChapterViewsModule } from '../chapter-views/chapter-views.module';
import { UsersModule } from 'src/users/users.module';
import { Chapter } from 'src/chapters/entities/chapter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manga]),
    TypeOrmModule.forFeature([Chapter]),
    ChapterViewsModule,
    UsersModule,
  ],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {}
