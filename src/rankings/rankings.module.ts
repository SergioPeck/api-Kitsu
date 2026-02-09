import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from 'src/chapters/entities/chapter.entity';
import { Manga } from 'src/mangas/entities/mangas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, Chapter])],
  controllers: [RankingsController],
  providers: [RankingsService],
})
export class RankingsModule {}
