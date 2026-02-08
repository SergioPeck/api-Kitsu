import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateBannerDto {
  @IsUUID()
  mangaId: string;

  @IsString()
  @IsUrl({ require_protocol: true })
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
