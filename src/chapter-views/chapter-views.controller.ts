import { Controller, Post, Body } from '@nestjs/common';
import { ChapterViewsService } from './chapter-views.service';
import { CreateChapterViewDto } from './dto/create-chapter-view.dto';
import { Public } from 'src/auth/guards/public.decorator';

@Controller('views')
export class ChapterViewsController {
  constructor(private readonly service: ChapterViewsService) {}

  @Public()
  @Post()
  registerView(@Body() dto: CreateChapterViewDto) {
    return this.service.create(dto);
  }
}
