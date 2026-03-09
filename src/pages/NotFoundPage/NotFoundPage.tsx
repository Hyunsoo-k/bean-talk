import type { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

import notFoundImage from "@/assets/images/not-found.png"
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles["not-found-page-component"]}>
      <img src={notFoundImage} className={styles["not-found-image"]} />
      <p className={styles['text']}>
        페이지를 찾을 수 없습니다.
      </p>
      <ul className={styles["link-list"]}>
        <li className={styles["link-wrapper"]}>
          <Link to="/" className={styles["hyper-text"]}>
            홈으로
          </Link>
        </li>
        <li className={styles["link-wrapper"]}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles["button-link"]}
          >
            뒤로가기
          </button>
        </li>
      </ul>
    </div>
  );
};

export { NotFoundPage };