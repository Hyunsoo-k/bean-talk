import type { CardType } from "@/types/cardType";
import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

type HomeSectionProps = {
  category: Category;
  subTitle: string;
  cardType: CardType;
  layout: "flex" | "grid";
  posts: Post<Category>[]
};

export type { HomeSectionProps };