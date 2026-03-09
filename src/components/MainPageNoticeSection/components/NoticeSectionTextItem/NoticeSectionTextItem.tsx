import type { JSX } from "react";

import styles from "./NoticeSectionTextItem.module.scss";

const MarketTrendTextItem = (): JSX.Element => {
  return (
    <div className={styles["notice-section-text-item-component"]}>
      <div className={styles["header"]}>
        <h2 className={styles["about-bean-talk"]}>
          ABOUT BEANTALK
        </h2>
        <h2 className={styles["title"]}>
          BeanTalk은 커피 관련 정보들을 전달하고, 커피 애호가끼리 소통할 수 있는 환경을 제공하는 비영리 웹 애플리케이션 입니다.
        </h2>
      </div>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          BeanTalk은 각자의 이야기를 공유하고 토론할 수 있는 열린 커뮤니티를 지향합니다.
          사용자는 자신의 취향과 경험을 글과 댓글로 자유롭게 표현하며, 다른 커피 애호가들의 관점과 노하우를 통해 새로운 인사이트를 얻을 수 있습니다.<br /><br />
          BeanTalk은 초보자와 숙련자 모두가 부담 없이 참여할 수 있는 환경을 목표로 합니다.
          커피를 막 시작한 사람은 질문을 통해 도움을 받을 수 있고, 경험이 많은 사용자는 자신의 지식을 나누며 커뮤니티에 기여할 수 있습니다.
          이러한 상호작용을 통해 커피에 대한 이해를 함께 넓혀가고, 개인의 취향이 존중받는 문화를 만들어갑니다.<br /><br />
          또한 상업적 홍보나 광고보다는 순수한 정보 교류와 진솔한 소통에 가치를 두어, 신뢰할 수 있는 커뮤니티 공간을 유지하고자 합니다.
          BeanTalk은 커피라는 공통의 관심사를 통해 사람들을 연결하고, 지속적인 대화와 참여를 통해 살아 있는 커뮤니티를 만들어가는 것을 목표로 합니다.
          이를 통해 커피를 단순한 음료가 아닌, 경험과 이야기를 공유하는 매개체로 확장하고자 합니다.
        </p>
      </div>
      <div className={styles["footer"]}>
        <button type="button" className={styles["read-more-button"]}>
          Read more
        </button>
      </div>
    </div>
  );
};

export { MarketTrendTextItem };