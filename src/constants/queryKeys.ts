import type { Category } from "@/types/category";
import type { QueryParams } from "@/types/postsParams";

const QUERY_KEYS = {
  userMe: ["userMe"],
  notifications: ["notifications"],
  posts: (category: Category, queryParams?: QueryParams) => {
    const queryKey = ["posts", category, queryParams]

    return queryKey;
  },
  integratedPosts: (queryParams: QueryParams) => {
    const queryKey = ["integratedPosts", queryParams];

    return queryKey;
  },
  myPosts: ["myPosts"],
  scraps: ["scraps"],
  post: (category: Category, post_id: string) => ["post", category, post_id],
  comments: (category: Category, post_id: string) => ["comments", category, post_id],
  locals: (query: string) => ["locals", query]
};

export { QUERY_KEYS };