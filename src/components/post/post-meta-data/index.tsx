import type { Dispatch, JSX, MouseEvent, SetStateAction } from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaBookmark, FaRegHeart } from "react-icons/fa6";

import styles from "./index.module.scss";

type Props = {
  isPostPage: boolean;
  setIsCommentSectionOpen?: Dispatch<SetStateAction<boolean>>;
};

const PostMetaData = ({ isPostPage, setIsCommentSectionOpen }: Props): JSX.Element => {
  const handleClickCommentCount = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isPostPage && setIsCommentSectionOpen) setIsCommentSectionOpen((prev: boolean) => !prev);
  };
  
  return (
    <div className={styles["post-meta-data-component"]}>
      <button type="button" onClick={handleClickCommentCount}>
        <LuMessageCircleMore size={20} color="rgb(148,163,184)" />3
      </button>
      <button type="button">
        <FaRegHeart size={20} color="rgb(148,163,184)" />3
      </button>
      <button type="button">
        <FaBookmark size={17} color="rgb(148,163,184)" />0
      </button>
    </div>
  );
};

export default PostMetaData;