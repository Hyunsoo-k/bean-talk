import type { Category } from "./category"
import type { Post } from "./post"

type InfinitePostsData = {
  pages: {
    posts: Post<Category>[],
    haxNextPage: boolean,
    nextCursor: string | null
  }[];
  pageParams: unknown[];
};

export type { InfinitePostsData };