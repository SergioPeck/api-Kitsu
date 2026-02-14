import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { StatusManga } from 'src/common/statusManga.enum';
import { OriginManga } from 'src/common/originManga.enum';

@Entity()
@Unique(['slug'])
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
  status: StatusManga;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastChapterAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    type: 'enum',
    enum: OriginManga,
    default: OriginManga.MANGA,
    nullable: false,
  })
  origin: OriginManga;

  @OneToMany(() => Chapter, (chapter) => chapter.manga)
  chapters: Chapter[];

  @Column()
  uploaderId: string;

  @Column({ unique: true })
  slug: string;
}
