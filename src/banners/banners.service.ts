import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

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
    return this.bannersRepo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
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
