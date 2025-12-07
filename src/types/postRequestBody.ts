import type {
  Category,
  CategoryHavingSubCategory,
  SubCategory
} from "./category";

type BasePostRequestBody = {
  title: string;
  content: string;
};

type PostRequestBody<T extends Category> = T extends CategoryHavingSubCategory
    ? BasePostRequestBody & { subCategory: SubCategory<T> }
    : BasePostRequestBody;

export type { PostRequestBody };