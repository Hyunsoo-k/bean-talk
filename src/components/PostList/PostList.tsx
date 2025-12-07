import type { JSX, RefObject } from "react";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { CARD_COMPONENT_MAP } from "./constants/cardComponentMap";

import styles from "./PostList.module.scss";

type Props = {
  type: "flex" | "grid";
  cardType: "background" | "column" | "job" | "row" | "thread";
  category: Category;
  posts: Post[];
  isRenderedOnMainPage: boolean;
  lastPostRef: RefObject<HTMLLIElement | null>;
};

const PostList = ({
  type,
  cardType,
  category,
  posts,
  isRenderedOnMainPage,
  lastPostRef
}: Props): JSX.Element => {
  const postsToRender = isRenderedOnMainPage
    ? posts.slice(0, 4)
    : posts;

  const Component = CARD_COMPONENT_MAP[cardType];

  return (
    <ul className={`${styles["post-list-component"]} ${styles[type]}`}>
      {postsToRender.map((post, index) => (
        <li
          key={post._id}
          className={styles["post-card-wrapper"]}
          ref={index === postsToRender.length - 1
            ? lastPostRef
            : null
          }
        >
          <Component category={category} post={post} />
        </li>
      ))}
    </ul>
  );
};

export { PostList };