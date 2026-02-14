import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Manga } from '../../mangas/entities/mangas.entity';
import { ChapterView } from 'src/chapter-views/entities/chapter-view.entity';

@Entity()
@Unique(['mangaId', 'chapterNumber'])
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', {
    precision: 4,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  chapterNumber: number;

  @Column()
  title: string;

  @Column('simple-array', { nullable: false })
  images: string[];

  @Column({
    default: 0,
  })
  totalViews: number;

  @ManyToOne(() => Manga, (manga) => manga.chapters, {
    onDelete: 'CASCADE',
  })
  manga: Manga;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  mangaId: string;

  @OneToMany(() => ChapterView, (view) => view.chapter)
  views: ChapterView[];
}
