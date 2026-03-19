import type { JSX } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/HomePage/HomePage";
import { PostListPage } from "@/pages/PostListPage/PostListPage";
import { PostDetailPage } from "@/pages/PostDetailPage/PostDetailPage";
import { PostCreatePage } from "@/pages/PostCreatePage/PostCreatePage";
import { PostEditPage } from "@/pages/PostEditPage/PostEditPage";
import { Notificationpage } from "@/pages/NotificationPage/NotificationPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { MyInformationPage } from "@/pages/MyInformationPage/MyInformationPage";

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
            type="grid"
            cardType="column"
            category="promotion"
          />
        }
      />
      <Route
        path="/categories/promotion/posts/:post_id"
        element={<PostDetailPage category="promotion" />}
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
          />
        }
      />
      <Route
        path="/categories/job/posts/:post_id"
        element={<PostDetailPage category="job" />}
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
            type="grid"
            cardType="background"
            category="news"
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
          />
        }
      />
      <Route
        path="/categories/notice/posts/:post_id"
        element={<PostDetailPage category="notice" />}
      />
      <Route
        path="/categories/notice/posts/create"
        element={<PostCreatePage category="notice" />}
      />
      <Route
        path="/categories/notice/posts/:post_id/edit"
        element={<PostEditPage category="notice" />}
      />
      <Route
       path="/me/information"
       element={<MyInformationPage />}
      />
      <Route
       path="/me/notification"
       element={<Notificationpage />}
      />
      {/* 404*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRoutes };