import { useState, type JSX } from "react";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import PostMetaData from "@/components/post/post-meta-data";
import CommentSection from "@/components/comments/comment-section";

import styles from "./index.module.scss";

const PostViewer = (): JSX.Element => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  return (
    <div className={styles["post-viewer-component"]}>
      <div className={styles["top"]}>
        <h2 className={styles["title"]}>
          커피관련 제목 커피관련 제목커피관련 제목 커피관련 제목커피관련 제목 커피관련 제목
        </h2>
        <div className={styles["information"]}>
          <div className={styles["profile-box"]}>
            <div className={styles["profile-image"]} style={{ backgroundImage: `url(${defaultProfile})` }} />
            <span className={styles["nickname"]}>운영자</span>
          </div>
          <div className={styles["dot"]} />
          <span className={styles["created-at"]}>2025년 9월 6일</span>
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["content"]}>
          커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련
          내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용
          커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련
          내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용
          커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용
        </div>
      </div>
      <div className={styles["bottom"]}>
        <PostMetaData isPostPage={true} setIsCommentSectionOpen={setIsCommentSectionOpen} />
        <CommentSection isPostPage={true} isCommentSectionOpen={isCommentSectionOpen} />
      </div>
    </div>
  );
};

export default PostViewer;
