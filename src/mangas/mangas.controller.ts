import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MangaService } from './mangas.service';
import { CreateMangaDto } from './dto/create-mangas.dto';
import { UpdateMangaDto } from './dto/update-mangas.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MangaOwnerGuard } from 'src/auth/guards/mangaOwner.guard';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN', 'UPLOADER')
  @Post()
  create(@Body() dto: CreateMangaDto) {
    return this.mangaService.create(dto);
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(id);
  }

  @UseGuards(FirebaseAuthGuard, RolesGuard, MangaOwnerGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMangaDto) {
    return this.mangaService.update(id, dto);
  }

  @UseGuards(FirebaseAuthGuard, MangaOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(id);
  }
}