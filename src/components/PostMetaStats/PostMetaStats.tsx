import { LuMessageCircleMore } from "react-icons/lu";
import {
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart
} from "react-icons/fa6";

import type { Category } from "@/types/category";
import type { UserMe } from "@/types/userMe";
import type { Post } from "@/types/post";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useToggleLike } from "./hooks/useToggleLike";
import { useToggleScrap } from "./hooks/useToggleScrap";

import styles from "./PostMetaStats.module.scss";


type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
  handleClickCommentIcon?: () => void;
  isLoading?: boolean;
  noPadding?: boolean;
};

const PostMetaStats = <T extends Category>({
  category,
  post,
  handleClickCommentIcon,
  isLoading,
  noPadding
}: Props<T>)=> {
  const userMeData: undefined | UserMe = queryClient.getQueryData(QUERY_KEYS.userMe);
  const { open: openAuthModal } = useAuthModalStore();

  const {
    _id: post_id,
    likes,
    scraps,
    commentCount
  } = post;

  const { mutate: toggleLike, isPending: isTogglingLike } = useToggleLike(category, post_id);
  const { mutate: toggleScrap, isPending: isTogglingScrap } = useToggleScrap(category, post_id);

  const { data: userMe } = useGetUserMe();

  const handleLikeClick = () => {
    if (!userMe) {
      return openAuthModal();
    }

    toggleLike();
  };

  const handleScrapClick = () => {
    if (!userMe) {
      return openAuthModal();
    }

    toggleScrap();
  };


  if (isLoading) {
    return null;
  }

  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={`${styles["post-meta-stats-component"]} ${noPadding ? styles["no-padding"] : ""}`}
    >
      <li className={styles["action-button-wrapper"]}>
        <button
          type="button"
          disabled={isTogglingLike}
          onClick={handleLikeClick}
          className={styles["action-button"]}
        >
          {userMeData && likes.includes(userMeData._id)
            ? <FaHeart color="rgb(210, 110, 105)" className={styles["icon"]} />
            : <FaRegHeart color="rgb(210, 110, 105)" className={styles["icon"]} />
          }
          좋아요 {likes.length}
        </button>
      </li>
      <li className={styles["action-button-wrapper"]}>
        <button
          type="button"
          disabled={isTogglingScrap}
          onClick={handleScrapClick}
          className={styles["action-button"]}
        >
          {userMeData && scraps.includes(userMeData._id)
            ? <FaBookmark color="#FFC107" className={styles["icon"]} />
            : <FaRegBookmark color="#FFC107" className={styles["icon"]} />
          }
          스크랩 {scraps.length}
        </button>
      </li>
      <li className={styles["action-button-wrapper"]}>
        <button
          type="button"
          onClick={handleClickCommentIcon}
          className={styles["action-button"]}
        >
          <LuMessageCircleMore color="rgb(100,116,139)" className={styles["icon"]} />
          댓글 {commentCount ?? 0}
        </button>
      </li>
    </ul>
  );
};

export { PostMetaStats };