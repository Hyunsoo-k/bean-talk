import type { JSX } from "react";
import { Link } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";

import styles from "./index.module.scss";

const Footer = (): JSX.Element => {
  return (
    <div className={styles["footer-component"]}>
      <div className={styles["top"]}>
        <Link to="/">
          <h1 className={styles["banner"]}>
            BeanTalk
          </h1>
          <small>
            평번한 순간을<br/>
            커피와 특별하게
          </small>
          <SiCoffeescript size={20} color="rgb(255,255,255)" />
        </Link>
      </div>
      <div className={styles["boundary-line"]}/>
      <div className={styles["bottom"]}>
        <span>
          BeanTalk는 커피 관련 정보들을 전달하고, 커피 애호가들끼리 소통할 수 있는 환경을 제공하는 비영리 웹 애플리케이션 입니다.<br/>
        </span>
      </div>
    </div>
  );
};

export default Footer;