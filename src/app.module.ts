import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MangaModule } from './mangas/mangas.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterViewsModule } from './chapter-views/chapter-views.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // SUPABASE
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

      autoLoadEntities: true,

      // Solo para desarrollo / primeras pruebas.
      synchronize: true,
    }),

    // Tus módulos
    UsersModule,
    AuthModule,
    MangaModule,
    ChaptersModule,
    ChapterViewsModule,
  ],
})
export class AppModule {}
