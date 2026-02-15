export interface ChapterRef {
  id: string;
  chapterNumber: number;
}

export interface RecentMangaItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  firstChapter: ChapterRef | null;
  lastChapters: ChapterRef[];
  lastChapterAt: Date;
}

export interface RecentMangaResponse {
  items: RecentMangaItem[];
  page: number;
  hasMore: boolean;
}
