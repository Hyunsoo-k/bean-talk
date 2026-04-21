import type { CardType } from "@/types/cardType";

import { PostCardBackground } from "@/components/postCards/PostCardBackground/PostCardBackground";
import { PostCardColumn } from "@/components/postCards/PostCardColumn/PostCardColumn";
import { PostCardJob } from "@/components/postCards/PostCardJob/PostCardJob";
import { PostCardRow } from "@/components/postCards/PostCardRow/PostCardRow";
import { PostCardThread } from "@/components/postCards/PostCardThread/PostCardThread";
import { PostCardPinterest } from "@/components/postCards/PostCardPinterest/PostCardPinterest";
import { PostCardSimple } from "@/components/postCards/PostCardSimple/PostCardSimple";
import { PostCardNews } from "@/components/postCards/PostCardNews/PostCardNews";

import { PostCardBackgroundSkeleton } from "@/components/postCardSkeletons/PostCardBackgroundSkeleton/PostCardBackgroundSkeleton";
import { PostCardColumnSkeleton } from "@/components/postCardSkeletons/PostCardColumnSkeleton/PostCardColumnSkeleton";
import { PostCardThreadSkeleton } from "@/components/postCardSkeletons/PostCardThreadSkeleton/PostCardThreadSkeleton";
import { PostCardRowSkeleton } from "@/components/postCardSkeletons/PostCardRowSkeleton/PostCardRowSkeleton";
import { PostCardJobSkeleton } from "@/components/postCardSkeletons/PostCardJobSkeleton/PostCardJobSkeleton";
import { PostCardSimpleSkeleton } from "@/components/postCardSkeletons/PostCardSimpleSkeleton/PostCardSimpleSkeleton";
import { PostCardNewsSkeleton } from "@/components/postCardSkeletons/PostCardNewsSkeleton/PostCardNewsSkeleton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CARD_COMPONENT_MAP: Record<CardType, React.ComponentType<any>> = {
  simple: PostCardSimple,
  background: PostCardBackground,
  column: PostCardColumn,
  job: PostCardJob,
  row: PostCardRow,
  thread: PostCardThread,
  pinterest: PostCardPinterest,
  news: PostCardNews
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CARD_SKELETON_COMPONENT_MAP: Record<CardType, React.ComponentType<any>> = {
  simple: PostCardSimpleSkeleton,
  background: PostCardBackgroundSkeleton,
  column: PostCardColumnSkeleton,
  job: PostCardJobSkeleton,
  row: PostCardRowSkeleton,
  thread: PostCardThreadSkeleton,
  pinterest: PostCardColumnSkeleton,
  news: PostCardNewsSkeleton
};

export { CARD_COMPONENT_MAP, CARD_SKELETON_COMPONENT_MAP }; 