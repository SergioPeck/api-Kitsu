export type ChapterImageDto = {
  id: string;
  imageUrl: string;
  pageNumber: number;
};

export type ChapterDto = {
  id: string;
  chapterNumber: number;
  createdAt: string; // ISO
  images: ChapterImageDto[];
};

export type MangaDto = {
  id: string;
  title: string;
  slug: string;
};

export type ChapterBySlugResponseDto = {
  manga: {
    id: string;
    title: string;
    slug: string;
  };
  chapter: {
    id: string;
    chapterNumber: number;
    title: string;
    createdAt: string;
    images: string[];
  };
};
