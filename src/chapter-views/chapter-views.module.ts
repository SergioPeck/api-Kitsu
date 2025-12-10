import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterView } from './entities/chapter-view.entity';
import { ChapterViewsService } from './chapter-views.service';
import { ChapterViewsController } from './chapter-views.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterView])],
  controllers: [ChapterViewsController],
  providers: [ChapterViewsService],
  exports: [ChapterViewsService],
})
export class ChapterViewsModule {}
