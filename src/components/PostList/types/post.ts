type Post = {
  _id: string;
  __v: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  subCategory?: "cafe" | "deliver" | "hiring" | "seeking";
  author: {
    _id: string,
    nickname: string,
  },
  thumbnailUrl: string | null;
  title: string;
  content: string;
  commentCount: number;
  likes: string[];
  scraps: string[];
};

export type { Post };