import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MangaService } from './mangas.service';
import { CreateMangaDto } from './dto/create-mangas.dto';
import { UpdateMangaDto } from './dto/update-mangas.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MangaOwnerGuard } from 'src/auth/guards/mangaOwner.guard';
import { Public } from 'src/auth/guards/public.decorator';
import { RecentMangaResponse } from 'src/common/recent-manga.type';
import { ChapterListItemDto } from './dto/chapter-list-item.dto';
import { ChaptersService } from 'src/chapters/chapters.service';

export type ChaptersResponse = {
  chapters: ChapterListItemDto[];
};

@Controller('manga')
export class MangaController {
  constructor(
    private readonly mangaService: MangaService,
    private readonly chaptersService: ChaptersService,
  ) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN', 'UPLOADER')
  @Post()
  create(@Body() dto: CreateMangaDto) {
    return this.mangaService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Public()
  @Get('recent')
  getRecentMangas(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<RecentMangaResponse> {
    return this.mangaService.getRecentMangas(Number(page), Number(limit));
  }

  @Public()
  @Get('recent/updates')
  getRecentlyUpdated() {
    return this.mangaService.getRecentlyUpdated();
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.mangaService.findOne(slug);
  }

  @Public()
  @Get(':slug/chapters')
  async getChapters(@Param('slug') slug: string): Promise<ChaptersResponse> {
    const chapters = await this.mangaService.getChaptersByManga(slug);

    if (!chapters) {
      throw new NotFoundException('Manga not found');
    }

    return { chapters };
  }

  @Public()
  @Get(':slug/cap-:chapterNumber')
  getChapterBySlugAndNumber(
    @Param('slug') slug: string,
    @Param('chapterNumber') chapterNumber: string,
  ) {
    return this.chaptersService.getReaderByMangaSlugAndNumber(
      slug,
      chapterNumber,
    );
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard, MangaOwnerGuard)
  @Roles('ADMIN')
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() dto: UpdateMangaDto) {
    return this.mangaService.update(slug, dto);
  }

  @UseGuards(FirebaseAuthGuard, MangaOwnerGuard)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.mangaService.remove(slug);
  }
}
