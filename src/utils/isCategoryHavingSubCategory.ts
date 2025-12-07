import type { Category, CategoryHavingSubCategory } from "@/types";

const isCategoryHavingSubCategory = (category: Category): category is CategoryHavingSubCategory => {
  return ["promotion", "job", "news"].includes(category);
};

export { isCategoryHavingSubCategory };