import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import { CarouselSingle } from "@/components/carousels/CarouselSIngle/CarouselSingle";
import { HomeSection } from "./components/HomeSection/HomeSection";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const {
    data: newsData,
    isLoading: isNewsDataLoading
  } = useInfinitePosts("news");
  const {
    data: explorationData,
    isLoading: isExplorationDataLoading
  } = useInfinitePosts("exploration");
  const {
    data: essayData,
    isLoading: isEssayDataLoading,
  } = useInfinitePosts("essay");
  const {
    data: promotionsData,
    isLoading: isPromotionsDataLoading
  } = useInfinitePosts("promotion");

  const newsPosts = newsData?.pages?.flatMap((page) => page.posts) ?? [];
  const explorationPosts = explorationData?.pages?.flatMap((page) => page.posts) ?? [];
  const essayPosts = essayData?.pages?.flatMap((page) => page.posts) ?? [];
  const promotionPosts = promotionsData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["home-page-component"]}>
      <section className={styles["news-carousel-section"]}>
        <CarouselSingle posts={newsPosts} isLoading={isNewsDataLoading} />
      </section>
      <HomeSection
        category="exploration"
        subTitle="카페 탐방 이야기를 작성해 보세요."
        layout="overflow"
        cardType="simple"
        posts={explorationPosts}
        isLoading={isExplorationDataLoading}
        isGrayBackground={false}
      /> 
      <HomeSection
        category="promotion"
        subTitle="여러분의 카페, 제품 홍보글을 작성해 보세요."
        layout="grid"
        cardType="column"
        posts={promotionPosts}
        isLoading={isPromotionsDataLoading}
        isGrayBackground={true}
      /> 
      <HomeSection
        category="news"
        subTitle="커피와 관련된 다양한 뉴스를 확인해 보세요."
        layout="grid"
        cardType="news"
        posts={newsPosts}
        isLoading={isNewsDataLoading}
      /> 
      <HomeSection
        category="essay"
        subTitle="자유롭게 에세이를 작성해 보세요."
        layout="overflow"
        cardType="pinterest"
        posts={essayPosts}
        isLoading={isEssayDataLoading}
        isGrayBackground={true}
      /> 
    </div>
  );
};

export { HomePage };
