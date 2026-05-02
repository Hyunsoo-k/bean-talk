import type { Category } from "@/types/category";
import type { PostsParams } from "@/types/postsParams";

const QUERY_KEYS = {
  userMe: ["userMe"],
  notifications: ["notifications"],
  posts: (category: Category, params?: PostsParams) => {
    const queryKey: (string | PostsParams)[] = ["posts", category];
    if (params) {
      queryKey.push(params);
    }

    return queryKey;
  },
  integratedPosts: (params: PostsParams) => ["integratedPosts", params],
  myPosts: ["myPosts"],
  scraps: ["scraps"],
  post: (category: Category, post_id: string) => ["post", category, post_id],
  comments: (category: Category, post_id: string) => ["comments", category, post_id],
  locals: (query: string) => ["locals", query]
};

export { QUERY_KEYS };