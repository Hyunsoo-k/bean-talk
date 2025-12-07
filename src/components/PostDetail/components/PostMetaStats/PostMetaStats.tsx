import type { JSX } from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaBookmark, FaRegHeart } from "react-icons/fa6";

import type { Category } from "@/types";
import type { PostDetail } from "../../types";

import styles from "./PostMetaStats.module.scss";

type Props = {
  isLoading: boolean;
  category: Category;
  queryData: PostDetail;
};

const PostMetaStats = ({ isLoading, category, queryData }: Props): JSX.Element => {
  if (isLoading) {
    return <div></div>
  }

  const { likes, scraps, commentCount } = queryData;

  return (
    <div className={styles["post-meta-stats-component"]}>
      <button>
        <FaRegHeart size={20} color="rgb(44, 44, 44)" />
        좋아요 {likes.length}
      </button>
      <button>
        <FaBookmark size={17} color="rgb(44, 44, 44)" />
        스크랩 {scraps?.length}
      </button>
      <button>
        <LuMessageCircleMore size={20} color="rgb(44, 44, 44)" />
        댓글 {commentCount ?? 0}
      </button>
    </div>
  );
};

export { PostMetaStats };