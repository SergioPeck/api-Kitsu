import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { MangaService } from 'src/mangas/mangas.service';

@Injectable()
export class MangaOwnerGuard implements CanActivate {
  constructor(private readonly mangaService: MangaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const slum = request.params.slum;

    const manga = await this.mangaService.findOne(slum);

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    if (user.role === 'ADMIN') return true;

    if (manga.uploaderId === user.uid) return true;

    throw new ForbiddenException('You are not the owner of this manga');
  }
}
