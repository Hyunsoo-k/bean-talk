import type { JSX } from "react";
import { Link } from "react-router-dom";

import mockImage from "@/assets/default-images/mock-image.jpg";

import styles from "./index.module.scss";

const BackgroundThumbnailItem = (): JSX.Element => {
  return (
    <Link
      to="/"
      className={styles["background-thumbnail-item-component"]}
      style={{ backgroundImage: `url(${mockImage})`}}
    >
      <div className={styles["overlay"]}>
        <h2 className={styles["title"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </h2>
        <span className={styles["content"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
        </span>
        <span className={styles["category"]}>News</span>
        <small className={styles["created-at"]}>
          2025/09/05
        </small>
      </div>
    </Link>
  );
};

export default BackgroundThumbnailItem;