import type { Dispatch, SetStateAction } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

import type { Post } from "@/types/post";

import styles from "./CarouselPagination.module.scss";

type Props = {
  posts: Post<"news">[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

const CarouselPagination = ({ posts, currentIndex, setCurrentIndex }: Props) => {
  const handleSelectPost = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <ul className={styles["carousel-pagination-component"]}>
      {posts.map((post: Post<"news">, index: number) => (
        <li
          key={`${post._id}`}
          onClick={() => { handleSelectPost(index); }}
          className={styles["item"]}
        >
          {currentIndex === index
            ? <FaCircle className={styles["circle-icon"]} />
            : <FaRegCircle className={styles["circle-icon"]} />
          }
        </li>
      ))}
    </ul>
  );
};

export { CarouselPagination };