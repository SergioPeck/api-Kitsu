import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { StatusManga } from 'src/common/statusManga.enum';
import { OriginManga } from 'src/common/originManga.enum';

@Entity()
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({
    type: 'enum',
    enum: StatusManga,
    default: StatusManga.ONGOING,
    nullable: false,
  })
  status:StatusManga;

  @Column({
    type: 'enum',
    enum: OriginManga,
    default: OriginManga.MANGA,
    nullable: false,
  })
  origin: OriginManga;

  @OneToMany(() => Chapter, chapter => chapter.manga)
  chapters: Chapter[];

  @Column()
  uploaderId: string;
}