export interface ChapterReaderResponse {
  id: string;
  chapterNumber: number;
  title: string;
  images: string[];
  mangaId: string;
  prevChapterId: string | null;
  nextChapterId: string | null;
  chapters: {
    id: string;
    chapterNumber: number;
  }[];
}
