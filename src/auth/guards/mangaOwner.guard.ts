import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { MangaService } from 'src/mangas/mangas.service';

@Injectable()
export class MangaOwnerGuard implements CanActivate {
  constructor(private readonly mangaService: MangaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const mangaId = request.params.id;

    const manga = await this.mangaService.findOne(mangaId);

    if (!manga) {
      throw new ForbiddenException('Manga not found');
    }

    if (user.role === 'ADMIN') return true;

    if (manga.uploaderId === user.uid) return true;

    throw new ForbiddenException('You are not the owner of this manga');
  }
}
