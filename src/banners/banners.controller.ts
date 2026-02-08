import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Public } from 'src/auth/guards/public.decorator';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(@Body() dto: CreateBannerDto) {
    return this.bannersService.create(dto);
  }

  @Get()
  findAll(@Query('active') active?: string) {
    const parsed =
      active === undefined ? undefined : active === 'true' || active === '1';
    return this.bannersService.findAll({ active: parsed });
  }

  @Public()
  @Get('home')
  findHome() {
    return this.bannersService.findHomeBanners();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannersService.update(id, dto);
  }

  @Patch(':id/active')
  setActive(
    @Param('id') id: string,
    @Query('value', ParseBoolPipe) value: boolean,
  ) {
    return this.bannersService.setActive(id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
