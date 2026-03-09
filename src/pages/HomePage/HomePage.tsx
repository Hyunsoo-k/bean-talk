import { Link } from "react-router-dom";
import { RxDoubleArrowRight } from "react-icons/rx";
import { BsFillThreadsFill } from "react-icons/bs";
import { VscMegaphone } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";

import { MainPageNoticeSection } from "@/components/MainPageNoticeSection";
import { useInfinitePosts } from "@/hooks";
import { FullPageSpinner } from "@/components/spinners";
import { CarouselSingle } from "@/components/carousels";
import { PostList } from "@/components/PostList/PostList";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const {
    data: newsData,
    isLoading: isNewsDataLoading
  } = useInfinitePosts({ category: "news" });
  const {
    data: promotionsData,
    isLoading: isPromotionsDataLoading
  } = useInfinitePosts({ category: "promotion" });
  const {
    data: threadsData,
    isLoading: isThreadsDataLoading
  } = useInfinitePosts({ category: "thread" });

  const newsPosts = newsData?.pages?.flatMap((page) => page.posts) ?? [];
  const promotionPosts = promotionsData?.pages?.flatMap((page) => page.posts) ?? [];
  const theadPosts = threadsData?.pages?.flatMap((page) => page.posts) ?? [];

  if (isNewsDataLoading) {
    return <FullPageSpinner />
  }

  return (
    <div className={styles["home-page-layout-component"]}>
      <section className={styles["news-carousel-wrapper"]}>
        <CarouselSingle posts={newsPosts} />
      </section>
      <section className={styles["section"]}>
        <MainPageNoticeSection />
      </section>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>
            <VscMegaphone
              size={20}
              color="rgb(44, 44, 44)"
              className={styles["category-icon"]}
            />
            카페·납품 홍보
          </h2>
          <Link
            to="/categories/promotion/posts"
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
          type="grid"
          cardType="column"
          category="promotion"
          posts={promotionPosts}
          isLoading={isPromotionsDataLoading}
        />
      </section>
      <section className={styles["section"]}>
        <div className={styles["header"]}>
          <h2 className={styles["title"]}>
            <IoNewspaperOutline
              size={20}
              color="rgb(44, 44, 44)"
              className={styles["category-icon"]}
            />
            뉴스
          </h2>
          <Link
            to="/categories/news/posts"
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
          type="grid"
          cardType="background"
          category="news"
          posts={newsPosts}
          isLoading={isNewsDataLoading}
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
            스레드
          </h2>
          <Link
            to="/categories/thread/posts"
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
            isLoading={isThreadsDataLoading}
          />
        </div>
      </section>
    </div>
  );
};

export { HomePage };
