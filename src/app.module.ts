import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MangaModule } from './mangas/mangas.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterViewsModule } from './chapter-views/chapter-views.module';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'false' ? { rejectUnauthorized: false } : false,
    }),

    // IMPORTAR USERSMODULE PRIMERO
    UsersModule,

    AuthModule,
    MangaModule,
    ChaptersModule,
    ChapterViewsModule,
    RankingsModule,
  ],
})
export class AppModule {}
