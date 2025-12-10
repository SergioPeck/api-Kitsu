import { PartialType } from '@nestjs/mapped-types';
import { CreateMangaDto } from './create-mangas.dto';

export class UpdateMangaDto extends PartialType(CreateMangaDto) {}
