import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./index.module.scss";

type Props = {
  category: Category
  post: Post;
};

const ThumbnailBackground = ({ category, post }: Props): JSX.Element => {
  const { _id, thumbnailUrl } = post;

  return (
    <Link
      to={`/bbs/categories/${category}/posts/${_id}`}
      className={styles["thumbnail-background-component"]}
      style={{ backgroundImage: `url(${thumbnailUrl || defaultImage})`}}
    />
  );
};

export default ThumbnailBackground;
