import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Manga } from '../../mangas/entities/mangas.entity';
import { ChapterView } from 'src/chapter-views/entities/chapter-view.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  chapterNumber: number;

  @Column()
  title: string;

  @Column('simple-array', { nullable: false })
  images: string[];

  @Column({
    default: 0,
  })
  totalViews: number;

  @ManyToOne(() => Manga, manga => manga.chapters, {
    onDelete: 'CASCADE',
  })
  manga: Manga;

  @Column()
  mangaId: string;
  
  @OneToMany(() => ChapterView, view => view.chapter)
  views: ChapterView[];
}
