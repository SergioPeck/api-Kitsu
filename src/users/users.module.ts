import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MangaModule } from 'src/mangas/mangas.module';
import { MangaOwnerGuard } from 'src/auth/guards/mangaOwner.guard';
import { MangaService } from 'src/mangas/mangas.service';

@Module({
  imports: [MangaModule],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: MangaOwnerGuard,
      useFactory: (mangaService: MangaService) => {
        return new MangaOwnerGuard(mangaService);
      },
      inject: [MangaService],
    },
  ],
})
export class UsersModule {}
