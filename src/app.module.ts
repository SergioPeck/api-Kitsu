import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MangasModule } from './mangas/mangas.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [AuthModule, UsersModule, MangasModule, ChaptersModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
