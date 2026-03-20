type Category = "thread" | "promotion" | "job" | "news" | "notice";

type CategoryHavingSubCategory = "promotion" | "job" | "news";

type SubCategory<T extends CategoryHavingSubCategory> =
  T extends "promotion" ? "cafe" | "delivery" :
  T extends "job" ? "hiring" | "seeking" :
  T extends "news" ? "domestic" | "international" :
  never;

export type {
  Category,
  CategoryHavingSubCategory,
  SubCategory,
};