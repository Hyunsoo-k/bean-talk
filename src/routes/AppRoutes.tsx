import { Route, Routes } from "react-router-dom";

import type { Category } from "@/types/category";
import type { CardType } from "@/types/cardType";
import { HomePage } from "@/pages/HomePage/HomePage";
import { PostListPage } from "@/pages/PostListPage/PostListPage";
import { PostDetailPage } from "@/pages/PostDetailPage/PostDetailPage";
import { PostCreatePage } from "@/pages/PostCreatePage/PostCreatePage";
import { PostEditPage } from "@/pages/PostEditPage/PostEditPage";
import { Notificationpage } from "@/pages/NotificationPage/NotificationPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { MyInformationPage } from "@/pages/MyInformationPage/MyInformationPage";
import { IntegratedSearchPage } from "@/pages/IntegratedSearchPage/IntegratedSearchPage";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

type Category_Routes = { category: Category, type: "flex" | "grid", cardType: CardType }[];

const CATEGORY_ROUTES: Category_Routes = [
  { category: "thread", type: "flex", cardType: "thread" },
  { category: "promotion", type: "grid", cardType: "column" },
  { category: "essay", type: "flex", cardType: "row" },
  { category: "exploration", type: "grid", cardType: "simple" },
  { category: "news", type: "grid", cardType: "news" },
  { category: "notice", type: "flex", cardType: "row" },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {CATEGORY_ROUTES.map(({ category, type, cardType }) => {
        const base = `/categories/${category}/posts`;
        return (
          <Route key={category}>
            <Route
              path={base}
              element={<PostListPage type={type} cardType={cardType} category={category} />}
            />
            <Route
              path={`${base}/:post_id`}
              element={<PostDetailPage category={category} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path={`${base}/create`}
                element={<PostCreatePage category={category} />}
              />
              <Route
                path={`${base}/:post_id/edit`}
                element={<PostEditPage category={category} />}
              />
            </Route>
          </Route>
        );
      })}
      <Route path="/integrated-search" element={<IntegratedSearchPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/me/information" element={<MyInformationPage />} />
        <Route path="/me/notification" element={<Notificationpage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRoutes };