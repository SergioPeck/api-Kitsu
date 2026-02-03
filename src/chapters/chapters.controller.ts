import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Public } from 'src/auth/guards/public.decorator';
import { ChapterReaderResponse } from './types/chapter-reader-response';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Public()
  @Get(':chapterId')
  getChapter(
    @Param('chapterId') chapterId: string,
  ): Promise<ChapterReaderResponse> {
    return this.chaptersService.getChapterWithNavigation(chapterId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChapterDto) {
    return this.chaptersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(id);
  }
}
