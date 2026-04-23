import type { Category } from "@/types/category";
import { CarouselOverflow } from "@/components/carousels/CarouselOverflow/CarouselOverflow";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

import styles from "./SameTopicCarousel.module.scss";

type Props = {
  category: Category;
};

const SameTopicCarousel = ({ category }: Props) => {
  const { data: queryData, isLoading } = useInfinitePosts(category);

  const posts = queryData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["same-topic-carousel-component"]}>
      <header className={styles["header"]}>
        <h2 className={styles["title"]}>
          같은 주제의 다른 글
        </h2>
        <h3 className={styles["sub-title"]}>
          다른 사람들이 쓴 글도 읽어보세요.
        </h3>
      </header>
      <div className={styles["body"]}>
        <CarouselOverflow posts={posts} isLoading={isLoading} cardType="simple" />
      </div>
    </div>
  );
};

export { SameTopicCarousel };