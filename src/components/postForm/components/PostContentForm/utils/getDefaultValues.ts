import type { DefaultValues } from "react-hook-form";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import type { PostRequestBody } from "@/types/postRequestBody";

import { CATEGORY_TO_SUB_CATEGORIES_MAP } from "@/constants/subCategoryMap";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { isPostHavingSubCategory } from "@/utils/isPostHavingSubCategory";

const getPostDefaultValues = <T extends Category>(
  category: T,
  initialData?: Post<T>
): DefaultValues<PostRequestBody<T>> => {
  const baseValues = {
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    thumbnailUrl: initialData?.thumbnailUrl ?? null,
  };

  if (
    initialData
      && isPostHavingSubCategory(initialData)
      && isCategoryHavingSubCategory(category)
  ) {
     return {
        ...baseValues,
        subCategory: initialData?.subCategory ?? CATEGORY_TO_SUB_CATEGORIES_MAP[category][0],
      } as DefaultValues<PostRequestBody<T>>;
    }

  return baseValues as DefaultValues<PostRequestBody<T>>;
};

export { getPostDefaultValues };