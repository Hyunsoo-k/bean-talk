import type { JSX } from "react";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import useGetPostsQuery from "@/hooks/api/posts/use-get-posts-query";
import ThumbnailColumn from "@/components/thumbnail/thumbnail-column";

import styles from "./index.module.scss";

type Props = {
  category: Category;
};

const ThumbnailCarouselMultiple = ({ category }: Props): JSX.Element => {
  const { data: queryData } = useGetPostsQuery(category);
  const posts = queryData?.posts?.slice(0, 5);

  if (!posts) {
    return (
      <ul></ul>
    );
  }

  return (
    <ul className={styles["thumbnail-carousel-multiple-component"]}>
      {posts.map((post: Post) => (
        <li key={post._id} className={styles["thumbnail-wrapper"]}>
          <ThumbnailColumn post={post} />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailCarouselMultiple;