import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // ajusta la ruta a tu entidad
import { MangaModule } from 'src/mangas/mangas.module';
import { MangaOwnerGuard } from 'src/auth/guards/mangaOwner.guard';
import { MangaService } from 'src/mangas/mangas.service';

@Module({
  imports: [
    MangaModule,
    TypeOrmModule.forFeature([User]), // <-- esto hace disponible el repositorio
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: MangaOwnerGuard,
      useFactory: (mangaService: MangaService) => new MangaOwnerGuard(mangaService),
      inject: [MangaService],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
