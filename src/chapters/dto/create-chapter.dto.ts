import {
  IsNumber,
  IsString,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
  IsString as IsStringEach,
} from 'class-validator';

export class CreateChapterDto {
  @IsNumber()
  chapterNumber: number;

  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsStringEach({ each: true })
  images: string[];

  @IsUUID()
  mangaId: string;
}
