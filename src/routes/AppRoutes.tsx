import type { JSX } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import { PostListPage } from "@/pages/PostListPage";
import { PostDetailPage } from "@/pages/PostDetailPage/PostDetailPage";
import { PostCreatePage } from "@/pages/PostCreatePage/PostCreatePage";
import { PostEditPage } from "@/pages/PostEditPage/PostEditPage";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/categories/thread/posts"
        element={
          <PostListPage
            type="flex"
            cardType="thread"
            category="thread"
            isRenderedOnMainPage={false}
          />
        }
      />
      <Route
        path="/categories/thread/posts/:post_id"
        element={<PostDetailPage category="thread" />}
      />
      <Route
        path="/categories/thread/posts/create"
        element={<PostCreatePage category="thread" />}
      />
      <Route
        path="/categories/thread/posts/:post_id/edit"
        element={<PostEditPage category="thread" />}
      />
      <Route
        path="/categories/promotion/posts"
        element={
          <PostListPage
            type="flex"
            cardType="row"
            category="promotion"
            isRenderedOnMainPage={false}
          />
        }
      />
      <Route
        path="/categories/promotion/posts/create"
        element={<PostCreatePage category="promotion" />}
      />
      <Route
        path="/categories/promotion/posts/:post_id/edit"
        element={<PostEditPage category="promotion" />}
      />
      <Route
        path="/categories/job/posts"
        element={
          <PostListPage
            type="flex"
            cardType="job"
            category="job"
            isRenderedOnMainPage={false}
          />
        }
      />
      <Route
        path="/categories/job/posts/create"
        element={<PostCreatePage category="job" />}
      />
      <Route
        path="/categories/job/posts/:post_id/edit"
        element={<PostEditPage category="job" />}
      />
      <Route
        path="/categories/news/posts"
        element={
          <PostListPage
            type="flex"
            cardType="row"
            category="news"
            isRenderedOnMainPage={false}
          />
        }
      />
      <Route
        path="/categories/news/posts/:post_id"
        element={<PostDetailPage category="news" />}
      />
      <Route
        path="/categories/news/posts/create"
        element={<PostCreatePage category="news" />}
      />
      <Route
        path="/categories/news/posts/:post_id/edit"
        element={<PostEditPage category="news" />}
      />
      <Route
        path="/categories/notice/posts"
        element={
          <PostListPage
            type="flex"
            cardType="row"
            category="notice"
            isRenderedOnMainPage={false}
          />
        }
      />
    </Routes>
  );
};

export { AppRoutes };