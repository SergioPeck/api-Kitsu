import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChapterViewDto {
  @IsUUID()
  chapterId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}
