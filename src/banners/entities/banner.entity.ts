import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Manga } from '../../mangas/entities/mangas.entity';

@Entity({ name: 'banners' })
@Index(['isActive', 'sortOrder'])
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index()
  mangaId: string;

  @ManyToOne(() => Manga, { onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'mangaId' })
  manga: Manga;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int' })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
