import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusManga } from 'src/common/statusManga.enum';
import { OriginManga } from 'src/common/originManga.enum';

export class CreateMangaDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsEnum(StatusManga)
  status?: StatusManga;

  @IsOptional()
  @IsEnum(OriginManga)
  origin?: OriginManga;

  @IsString()
  uploaderId: string;
}
