import type { CategoryHavingSubCategory, SubCategory } from "@/types/category";

const SUB_CATEGORY_TO_KR_MAP: Record<SubCategory<CategoryHavingSubCategory>, string> = {
  "cafe": "카페",
  "delivery": "납품",
  "hiring": "구인",
  "seeking": "구직",
  "domestic": "국내",
  "international": "국외",
};

const CATEGORY_TO_SUB_CATEGORYS_MAP: Record<
  CategoryHavingSubCategory,
  SubCategory<CategoryHavingSubCategory>[]
> = {
  "news": ["domestic", "international"],
  "promotion": ["cafe", "delivery"],
  "job": ["hiring", "seeking"],
};


export { SUB_CATEGORY_TO_KR_MAP, CATEGORY_TO_SUB_CATEGORYS_MAP };