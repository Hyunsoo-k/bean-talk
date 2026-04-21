import type { Category, CategoryHavingSubCategory } from "@/types/category";
import type { Post } from "@/types/post";
import { isCategoryHavingSubCategory } from "./isCategoryHavingSubCategory";

const isPostHavingSubCategory = (post: Post<Category>): post is Post<CategoryHavingSubCategory> => {
  return isCategoryHavingSubCategory(post.category);
};

export { isPostHavingSubCategory };