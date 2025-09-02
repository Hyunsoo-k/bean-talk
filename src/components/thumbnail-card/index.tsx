import type { JSX } from "react";

import defaultProfile from "@/assets/default-images/default-profile.jpg";

import styles from "./index.module.scss";

const ThumbnailCard = (): JSX.Element => {
  return (
    <div className={styles["thumbnail-card-component"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url(${defaultProfile})`}}
      />
      <div className={styles["top"]}>
        <span className={styles["category"]}>NEWS</span>
        <span className={styles["created-at"]}>2025-09-02</span>
      </div>
      <div className={styles["body"]}>
        <h2 className={styles["title"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </h2>
        <span className={styles["text"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </span>
      </div>
      <div className={styles["bottom"]}>
        <div className={styles["writer"]}>
          <div
            className={styles["profile-image"]}
            style={{ backgroundImage: `url(${defaultProfile})`}}
          />
          <span className={styles["nickname"]}>운영자</span>
        </div>
        <button type="button">View</button>
      </div>
    </div>
  );
};

export default ThumbnailCard;