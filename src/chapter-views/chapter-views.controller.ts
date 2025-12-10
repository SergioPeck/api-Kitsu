import { Controller, Post, Body } from '@nestjs/common';
import { ChapterViewsService } from './chapter-views.service';
import { CreateChapterViewDto } from './dto/create-chapter-view.dto';

@Controller('views')
export class ChapterViewsController {
  constructor(private readonly service: ChapterViewsService) {}

  @Post()
  registerView(@Body() dto: CreateChapterViewDto) {
    return this.service.create(dto);
  }
}
