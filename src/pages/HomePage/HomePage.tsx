import type { JSX } from "react";
import { Link } from "react-router-dom";
import { RxDoubleArrowRight } from "react-icons/rx";
import { BsFillThreadsFill } from "react-icons/bs";
import { VscMegaphone } from "react-icons/vsc";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import { PostCarousel } from "@/components/PostCarousel";
import { PostList } from "@/components/PostList/PostList";

import styles from "./HomePage.module.scss";
import { useInfinitePosts } from "@/components/PostList/hooks";

const HomePage = (): JSX.Element => {
  const { data: jobPostsData } = useInfinitePosts({ category: "job" });
  const { data: threadPostsData } = useInfinitePosts({ category: "thread" });

  const jobPosts = jobPostsData?.pages?.flatMap((page) => page.posts) ?? [];
  const theadPosts = threadPostsData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["home-page-layout-component"]}>
      <div className={styles["news-carousel-wrapper"]}>
        <PostCarousel
          type="single"
          category="news"
          isRenderedOnMainPage={true}
        />
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
          <Link
            to="/bbs/categories/promotion/posts"
            className={styles["view-more-button"]}
          >
            View more
            <RxDoubleArrowRight
              size={20}
              className={styles["view-more-arrow-image"]}
            />
          </Link>
        </div>
        <div className={styles["promotion-carousel-wrapper"]}>
          <PostCarousel
            type="multiple"
            category="promotion"
            isRenderedOnMainPage={true}
          />
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
          <Link
            to="/bbs/categories/job/posts"
            className={styles["view-more-button"]}
          >
            View more
            <RxDoubleArrowRight
              size={20}
              className={styles["view-more-arrow-image"]}
            />
          </Link>
        </div>
        <PostList
          type="flex"
          cardType="job"
          category="job"
          posts={jobPosts}
          isRenderedOnMainPage={true}
        />
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
          <Link
            to="/bbs/categories/thread/posts"
            className={styles["view-more-button"]}
          >
            View more
            <RxDoubleArrowRight
              size={20}
              className={styles["view-more-arrow-image"]}
            />
          </Link>
        </div>
        <div className={styles["threadsContainer-wrapper"]}>
          <PostList
            type="flex"
            cardType="thread"
            category="thread"
            posts={theadPosts}
            isRenderedOnMainPage={true}
          />
        </div>
      </section>
    </div>
  );
};

export { HomePage };
