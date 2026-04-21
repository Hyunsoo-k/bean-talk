import { Link, useMatch } from "react-router-dom";

import styles from "./Footer.module.scss";

const Footer = () => {
  const isCreatePage = useMatch("/categories/:category/posts/create");
  const isEditPage = useMatch("/categories/:category/posts/:id/edit");
  const isEditorPage = isCreatePage || isEditPage;

  return (
    <div className={`${styles["footer-component"]} ${isEditorPage && styles["editor-page"]}`}>
      <div className={styles["top"]}>
        <Link to="/" className={styles["link"]}>
          <h1 className={styles["banner"]}>
            BeanTalk
          </h1>
          <small className={styles["description"]}>
            평번한 순간을<br/>
            커피와 특별하게
          </small>
        </Link>
      </div>
      <div className={styles["boundary-line"]}/>
      <footer className={styles["footer"]}>
        <span className={styles["description"]}>
          BeanTalk는 커피 관련 정보들을 전달하고, 커피 애호가들끼리 소통할 수 있는 환경을 제공하는 비영리 웹 애플리케이션 입니다.<br/>
        </span>
      </footer>
    </div>
  );
};

export { Footer };