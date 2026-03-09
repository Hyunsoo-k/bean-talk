import type {
  Category,
  CategoryHavingSubCategory,
  SubCategory
} from "./category";

type BasePostRequestBody = {
  title: string;
  content: string;
  thumbnailUrl: string | null;
};

type JobDetail = {
  employmentType: "partTime" | "fullTime";
  position: "barista" | "manager";
  payType: "hourlyRate" | "salary" | "negotiation";
  payAmount: string;
}

type PostRequestBody<T extends Category> =
  BasePostRequestBody
  & (T extends CategoryHavingSubCategory
      ? { subCategory: SubCategory<T> }
      : {})
  & (T extends "news"
      ? { jobDetail: JobDetail }
      : {});


export type { PostRequestBody };