import type { Category } from "@/types/category";
import type { QueryParams } from "@/types/queryParams";

const QUERY_KEYS = {
  userMe: ["userMe"],
  notifications: ["notifications"],
  posts: (category: Category, queryParams?: QueryParams) => {
    const queryKey = ["posts", category];

    if (queryParams?.subCategory) {
      queryKey.push(queryParams?.subCategory)
    }

    if (queryParams?.searchTarget) {
      queryKey.push(queryParams?.searchTarget);
    }

    if (queryParams?.searchTarget && queryParams?.searchQuery) {
      queryKey.push(queryParams?.searchTarget, queryParams?.searchQuery);
    }

    return queryKey;
  },
  myPosts: ["myPosts"],
  scraps: ["scraps"],
  post: (category: Category, post_id: string) => ["post", category, post_id],
  comments: (category: Category, post_id: string) => ["comments", category, post_id]
};

export { QUERY_KEYS };