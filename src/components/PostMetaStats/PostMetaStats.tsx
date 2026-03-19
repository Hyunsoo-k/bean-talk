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
import { useToggleLike } from "./hooks/useToggleLike";
import { useToggleScrap } from "./hooks/useToggleScrap";

import styles from "./PostMetaStats.module.scss";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
  handleClickCommentIcon?: () => void;
  isLoading?: boolean;
};

const PostMetaStats = <T extends Category>({
  category,
  post,
  handleClickCommentIcon,
  isLoading
}: Props<T>)=> {
  const userMeData: undefined | UserMe = queryClient.getQueryData(QUERY_KEYS.userMe);

  const {
    _id: post_id,
    likes,
    scraps,
    commentCount
  } = post;

  const {
    mutate: toggleLike,
    isPending: isTogglingLike
  } = useToggleLike(category, post_id);

  const {
    mutate: toggleScrap,
    isPending: isTogglingScrap
  } = useToggleScrap(category, post_id);

  if (isLoading) {
    return <div></div>
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={styles["post-meta-stats-component"]}
    >
      <button
        type="button"
        disabled={isTogglingLike}
        onClick={() => { toggleLike(); }}
      >
        {
          userMeData && likes.includes(userMeData._id)
          ? <FaHeart color="rgb(210, 110, 105)" />
          : <FaRegHeart color="rgb(210, 110, 105)" />
        }
        좋아요 {likes.length}
      </button>
      <button
        type="button"
        disabled={isTogglingScrap}
        onClick={() => { toggleScrap(); }}
      >
        {
          userMeData && scraps.includes(userMeData._id)
          ? <FaBookmark color="#FFC107" />
          : <FaRegBookmark color="#FFC107" />
        }
        스크랩 {scraps.length}
      </button>
      <button
        type="button"
        onClick={handleClickCommentIcon}
      >
        <LuMessageCircleMore color="rgb(44, 44, 44)" />
        댓글 {commentCount ?? 0}
      </button>
    </div>
  );
};

export { PostMetaStats };