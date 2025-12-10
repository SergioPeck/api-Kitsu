import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Entity()
export class ChapterView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chapter, chapter => chapter.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter;

  @Index()
  @Column()
  chapterId: string;

  @Index()
  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  ipAddress: string;

  //Conocer de dónde vino la visita
  @Column({ nullable: true })
  referrer: string;

  @Index()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
