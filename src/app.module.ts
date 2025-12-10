import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MangaModule } from './mangas/mangas.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterViewsModule } from './chapter-views/chapter-views.module';

@Module({
  imports: [AuthModule, UsersModule, MangaModule, ChaptersModule, ChapterViewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
