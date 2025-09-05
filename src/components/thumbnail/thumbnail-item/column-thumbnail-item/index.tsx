import type { JSX } from "react";
import { Link } from "react-router-dom";
import { TfiArrowCircleRight } from "react-icons/tfi";
import mockImage from "@/assets/default-images/mock-image.jpg";

import styles from "./index.module.scss";

const ColumnThumbnailItem = (): JSX.Element => {
  return (
    <Link to="" className={styles["column-thumbnail-item-component"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${mockImage})`}}
      >
        <small className={styles["category"]}>NEWS</small>
      </div>
      <div className={styles["main"]}>
        <small className={styles["created-at"]}>2025년 9월 6일</small>
        <h2 className={styles["title"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </h2>
        <span className={styles["content"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </span>
        <div className={styles["bottom"]}>
          <TfiArrowCircleRight size={17} color="rgb(100,116,139)" />
          Read more
        </div>
      </div>
    </Link>
  );
};

export default ColumnThumbnailItem;