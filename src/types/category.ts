type Category = "thread" | "promotion" | "job" | "news" | "notice";

type CategoryHavingSubCategory = "promotion" | "job" | "news";

type SubCategory<T extends CategoryHavingSubCategory> =
  T extends "promotion" ? "cafe" | "delivery" :
  T extends "job" ? "hiring" | "seeking" :
  T extends "news" ? "domestic" | "international" :
  never;

type SubCategoryKr<T extends CategoryHavingSubCategory> =
  T extends "promotion" ? "카페" | "납품" :
  T extends "job" ? "구인" | "구직" :
  T extends "news" ? "국내" | "국외" :
  never;

export type {
  Category,
  CategoryHavingSubCategory,
  SubCategory,
  SubCategoryKr
};