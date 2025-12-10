import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChapterDto {
  @IsNumber()
  chapterNumber: number;

  @IsString()
  title: string;

  @IsOptional()
  images?: string[];

  @IsUUID()
  mangaId: string;
}
