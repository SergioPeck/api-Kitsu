import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepo: Repository<Chapter>,
  ) {}

  create(dto: CreateChapterDto) {
    const chapter = this.chapterRepo.create(dto);
    return this.chapterRepo.save(chapter);
  }

  findAll() {
    return this.chapterRepo.find();
  }

  async findOne(id: string) {
    const chapter = await this.chapterRepo.findOne({ where: { id } });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async update(id: string, dto: UpdateChapterDto) {
    const chapter = await this.findOne(id);
    Object.assign(chapter, dto);
    return this.chapterRepo.save(chapter);
  }

  async remove(id: string) {
    const chapter = await this.findOne(id);
    return this.chapterRepo.remove(chapter);
  }
}
