import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";
import type { QueryOption } from "@/types/queryOption";

const QUERY_KEYS = {
  userMe: ["userMe"],
  notifications: ["notifications"],
  posts: (
    category: Category,
    subCategory?: SubCategory<CategoryHavingSubCategory>,
    queryOption?: QueryOption,
    keyword?: string
  ) => {
    const queryKey = ["posts", category];

    if (subCategory) {
      queryKey.push(subCategory)
    }

    if (queryOption && keyword) {
      queryKey.push(queryOption, keyword);
    }

    return queryKey;
  },
  myPosts: ["myPosts"],
  scraps: ["scraps"],
  post: (category: Category, post_id: string) => ["post", category, post_id],
  comments: (category: Category, post_id: string) => ["comments", category, post_id]
};

export { QUERY_KEYS };