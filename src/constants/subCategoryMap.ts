import type { CategoryHavingSubCategory, SubCategory, SubCategoryKr } from "@/types/category";

const SUB_CATEGORY_TO_KR_MAP: {
  [T in CategoryHavingSubCategory as SubCategory<T>]: SubCategoryKr<T>
} = {
  "cafe": "카페",
  "delivery": "납품",
  "hiring": "구인",
  "seeking": "구직",
  "domestic": "국내",
  "international": "국외",
};

const SUB_CATEGORY_TO_ENG_MAP: Record<
  SubCategoryKr<CategoryHavingSubCategory>,
  SubCategory<CategoryHavingSubCategory>
  > = {
    "카페": "cafe",
    "납품": "delivery",
    "구인": "hiring",
    "구직": "seeking",
    "국내": "domestic",
    "국외": "international"
};

const CATEGORY_TO_SUB_CATEGORY_KR_ARRAY_MAP: Record<
    CategoryHavingSubCategory,
    SubCategoryKr<CategoryHavingSubCategory>[]
  > = {
    "news": ["국내", "국외"],
    "promotion": ["카페", "납품"],
    "job": ["구인", "구직"],
};

const CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP: Record<
    CategoryHavingSubCategory,
    SubCategory<CategoryHavingSubCategory>[]
  > = {
    "news": ["domestic", "international"],
    "promotion": ["cafe", "delivery"],
    "job": ["hiring", "seeking"],
};

export {
  SUB_CATEGORY_TO_KR_MAP,
  SUB_CATEGORY_TO_ENG_MAP,
  CATEGORY_TO_SUB_CATEGORY_KR_ARRAY_MAP,
  CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP
};