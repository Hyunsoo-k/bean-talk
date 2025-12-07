import type { JSX } from "react";

import type { Category } from "@/types/category";
import { useInfinitePosts } from "../PostList/hooks";
import { PostCarouselMultiple } from "./PostCarouselMultiple";
import { PostCarouselSingle } from "./PostCarouselSingle";

import styles from "./PostCarousel.module.scss";

type Props = {
  type: "multiple" | "single";
  category: Category;
  isRenderedOnMainPage?: boolean;
};

const PostCarousel = ({
  type,
  category,
  isRenderedOnMainPage = false
}: Props): JSX.Element => {
  const { data: queryData } = useInfinitePosts({ category });

  const allPosts: Post[] = queryData?.pages?.flatMap((page) => page.posts) ?? [];
  const postsToRender = isRenderedOnMainPage
    ? allPosts.slice(0, 4)
    : allPosts;

  const Component = type === "multiple"
    ? PostCarouselMultiple
    : PostCarouselSingle

  return (
    <div className={styles["post-carousel-component"]}>
      <Component category={category} isRenderedOnMainPage={isRenderedOnMainPage} />
    </div>
  )
};

export { PostCarousel };