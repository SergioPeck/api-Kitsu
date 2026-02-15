export interface ChapterReaderResponse {
  id: string;
  chapterNumber: number;
  title: string;
  images: string[];
  mangaId: string;
  mangaSlug: string;
  prevChapterId: string | null;
  prevChapterNumber: number | null;
  nextChapterId: string | null;
  nextChapterNumber: number | null;
}
