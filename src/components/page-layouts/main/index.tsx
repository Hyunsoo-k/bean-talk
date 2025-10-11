import type { JSX } from "react";
import { Link } from "react-router-dom";
import { RxDoubleArrowRight } from "react-icons/rx";
import { BsFillThreadsFill } from "react-icons/bs";
import { VscMegaphone } from "react-icons/vsc";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import ThumbnailCarouselSingle from "@/components/thumbnail-carousels/thumbnail-carousel-single";
import ThumbnailCarouselMultiple from "@/components/thumbnail-carousels/thumbnail-carousel-multiple";
import ThumbnailContainerFlex from "@/components/thumbnail-containers/thumbnail-container-flex";
import ThreadsContainer from "@/components/threads-container";

import styles from "./index.module.scss";

const MainPageLayout = (): JSX.Element => {
  return (
    <div className={styles["main-page-layout-component"]}>
      <div className={styles["news-carousel-wrapper"]}>
        <ThumbnailCarouselSingle category="news" />
      </div>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>
            <VscMegaphone
              size={20}
              color="rgb(210, 110, 105)"
              className={styles["category-icon"]}
            />
            카페·납품 홍보
          </h2>
          <Link to="/bbs/categories/promotion/posts" className={styles["view-more-button"]}>
            View more
            <RxDoubleArrowRight size={20} className={styles["view-more-arrow-image"]} />
          </Link>
        </div>
        <div className={styles["promotion-carousel-wrapper"]}>
          <ThumbnailCarouselMultiple category="promotion" isRenderedOnMainPage={true} />
        </div>
      </section>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>
            <HiOutlineBuildingOffice
              size={20}
              color="rgb(44, 44, 44)"
              className={styles["category-icon"]}
            />
            구인·구직
          </h2>
          <Link to="/bbs/categories/job/posts" className={styles["view-more-button"]}>
            View more
            <RxDoubleArrowRight size={20} className={styles["view-more-arrow-image"]} />
          </Link>
        </div>
        <ThumbnailContainerFlex category="job" />
      </section>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>
            <BsFillThreadsFill
              size={18}
              color="rgb(44, 44, 44)"
              className={styles["category-icon"]}
            />
            Threads
          </h2>
          <Link to="/bbs/categories/thread/posts" className={styles["view-more-button"]}>
            View more
            <RxDoubleArrowRight size={20} className={styles["view-more-arrow-image"]} />
          </Link>
        </div>
        <div className={styles["threadsContainer-wrapper"]}>
          <ThreadsContainer isRenderedOnMainPage={true} />
        </div>
      </section>
    </div>
  );
};

export default MainPageLayout;
