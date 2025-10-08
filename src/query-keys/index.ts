import type { Category, SubCategory } from "@/types/category";
import type { QueryOption } from "@/types/query-option";

const queryKeys = {
  userMe: () => ["userMe"],
  notifications: () => ["notifications"],
  posts: (
    category: Category,
    subCategory: SubCategory,
    queryOption?: QueryOption,
    keyword?: string,
  ) => {
    if (queryOption && keyword) {
      return [["posts", category, subCategory, queryOption, keyword]];
    }
    
    return ["posts", category, subCategory];
  },
  post: (post_id: string) => ["post", post_id]
};

export default queryKeys;