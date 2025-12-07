import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./PostCardJob.module.scss";

type Props = {
  category: Category
  post: Post;
};

const PostCardJob = ({ category, post }: Props): JSX.Element => {
  return (
    <Link to="" className={styles["post-card-job-component"]}>
      <div className={styles["information"]}>
        <div className={styles["top"]}>
          <span className={styles["author"]}>
            운영자
          </span>
          <div className={styles["boundary-dot"]}/>
          <span className={styles["created-at"]}>
            2025/10/05
          </span>
          <div className={styles["boundary-dot"]}/>
          <span className={styles["sub-category"]}>
            구인
          </span>
        </div>
        <div className={styles["middle"]}>
          <h2 className={styles["title"]}>
            주 5일제 직원 구합니다 주 5일제 직원 구합니다 주 5일제 직원 구합니다
          </h2>
          <div className={styles["content"]}>
            <span>
              모집 분야: 바리스타
            </span>
            <span>
              시급: 12,000원
            </span>
            <span>
              근무 시간: 15:00 ~ 22:30
            </span>
            <span>
              매장 위치: 경기도 안양시 만안구 문예로 20 안양아트센터 101호
            </span>
          </div>
        </div>
      </div>
      <div
        className={styles["thumbnail-image"]}
        style={{ backgroundImage: `url(${defaultImage})`}}
      />
    </Link>
  );
};

export { PostCardJob };