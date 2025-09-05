import type { JSX } from "react";

import styles from "./index.module.scss";

import mockImage from "@/assets/default-images/mock-image.jpg";

import { Link } from "react-router-dom";

const RowThumbnailItem = (): JSX.Element => {
  return (
    <Link to="" className={styles["row-thumbnail-item-component"]}>
      <div className={styles["top"]}>
        <div className={styles["created-at-wrapper"]}>
          <div className={styles["dot"]}/>
          <span className={styles["created-at"]}>2025년 9월 5일</span>
        </div>
        <span className={styles["category"]}>News</span>
      </div>
      <div className={styles["body"]}>
        <div
          className={styles["image"]}
          style={{ backgroundImage: `url(${mockImage})`}}
        />
        <div className={styles["main"]}>
          <h2 className={styles["title"]}>
            커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
            멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
          </h2>
          <span className={styles["content"]}>
            커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
            멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
            커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
            멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RowThumbnailItem;