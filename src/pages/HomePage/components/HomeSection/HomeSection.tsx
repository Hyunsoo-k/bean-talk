import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { CardType } from "@/types/cardType";
import type { PostListLayout } from "@/types/postListLayout";
import type { Post } from "@/types/post";
import { CarouselOverflow } from "@/components/carousels/CarouselOverflow/CarouselOverflow";
import { PostList } from "@/components/PostList/PostList";

import styles from "./HomeSection.module.scss";

type Props = {
  category: Category;
  subTitle: string;
  cardType: CardType;
  layout: PostListLayout;
  posts: Post<Category>[];
  isLoading: boolean;
  isGrayBackground?: boolean;
};

const HomeSection = ({
  category,
  subTitle,
  layout,
  cardType,
  posts,
  isLoading,
  isGrayBackground
 }: Props) => {
  return (
    <section
      className={`
        ${styles["home-section-component"]} 
        ${isGrayBackground && styles["gray-background"]}
        ${layout === "overflow" && styles["overflow"]}
        ${layout === "overflow" && cardType === "pinterest" && styles["pinterest"]}
      `}>
      <header className={styles["header"]}>
        <h2 className={styles["title"]}>
          <Link to={`/categories/${category}/posts`} className={styles["title-link"]}>
            {category.toUpperCase()}
          </Link>
        </h2>
        <h3 className={styles["sub-title"]}>
          {subTitle}
        </h3> 
      </header>
      <div className={styles["body"]}>
        {(cardType === "pinterest") || (cardType === "simple")
          ? <CarouselOverflow posts={posts} isLoading={isLoading} cardType={cardType} />
          : <PostList
              layout={layout}
              cardType={cardType}
              posts={posts}
              isLoading={isLoading}
              category={category}
            />
        }
      </div>
    </section>
  )
};

export { HomeSection };