import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

type HomeBannerRaw = {
  banner_id: string;
  banner_imageUrl: string;
  banner_isActive: boolean;
  banner_sortOrder: number;
  banner_mangaId: string;
  banner_createdAt: Date;
  banner_updatedAt: Date;
  manga_slug: string;
};

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannersRepo: Repository<Banner>,
  ) {}

  async create(dto: CreateBannerDto) {
    const banner = this.bannersRepo.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });
    return this.bannersRepo.save(banner);
  }

  async findAll(params?: { active?: boolean }) {
    const where =
      params?.active === undefined ? {} : { isActive: params.active };
    return this.bannersRepo.find({
      where,
      order: { isActive: 'DESC', sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findHomeBanners() {
    const banners = await this.bannersRepo
      .createQueryBuilder('banner')
      .leftJoin('banner.manga', 'manga')
      .where('banner.isActive = :active', { active: true })
      .orderBy('banner.sortOrder', 'ASC')
      .addOrderBy('banner.createdAt', 'DESC')
      .select([
        'banner.id',
        'banner.imageUrl',
        'banner.isActive',
        'banner.sortOrder',
        'banner.mangaId',
        'banner.createdAt',
        'banner.updatedAt',
        'manga.slug',
      ])
      .getRawMany<HomeBannerRaw>();

    return banners.map((b) => ({
      id: b.banner_id,
      imageUrl: b.banner_imageUrl,
      isActive: b.banner_isActive,
      sortOrder: b.banner_sortOrder,
      mangaId: b.banner_mangaId,
      createdAt: b.banner_createdAt,
      updatedAt: b.banner_updatedAt,
      mangaSlug: b.manga_slug,
    }));
  }

  async findOne(id: string) {
    const banner = await this.bannersRepo.findOne({ where: { id } });
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async update(id: string, dto: UpdateBannerDto) {
    const banner = await this.findOne(id);
    Object.assign(banner, dto);
    return this.bannersRepo.save(banner);
  }

  async setActive(id: string, isActive: boolean) {
    const banner = await this.findOne(id);
    banner.isActive = isActive;
    return this.bannersRepo.save(banner);
  }

  async remove(id: string) {
    const banner = await this.findOne(id);
    await this.bannersRepo.remove(banner);
    return { ok: true };
  }
}
