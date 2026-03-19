import { PostCardBackground } from "@/components/postCards/PostCardBackground/PostCardBackground";
import { PostCardColumn } from "@/components/postCards/PostCardColumn/PostCardColumn";
import { PostCardJob } from "@/components/postCards/PostCardJob/PostCardJob";
import { PostCardRow } from "@/components/postCards/PostCardRow/PostCardRow";
import { PostCardThread } from "@/components/postCards/PostCardThread/PostCardThread";
import { PostCardBackgroundSkeleton } from "@/components/postCardSkeletons/PostCardBackgroundSkeleton/PostCardBackgroundSkeleton";
import { PostCardColumnSkeleton } from "@/components/postCardSkeletons/PostCardColumnSkeleton/PostCardColumnSkeleton";
import { PostCardThreadSkeleton } from "@/components/postCardSkeletons/PostCardThreadSkeleton/PostCardThreadSkeleton";
import { PostCardRowSkeleton } from "@/components/postCardSkeletons/PostCardRowSkeleton/PostCardRowSkeleton";
import { PostCardJobSkeleton } from "@/components/postCardSkeletons/PostCardJobSkeleton/PostCardJobSkeleton";

const CARD_COMPONENT_MAP = {
  background: PostCardBackground,
  column: PostCardColumn,
  job: PostCardJob,
  row: PostCardRow,
  thread: PostCardThread,
};

const CARD_SKELETON_COMPONENT_MAP = {
  background: PostCardBackgroundSkeleton,
  column: PostCardColumnSkeleton,
  job: PostCardJobSkeleton,
  row: PostCardRowSkeleton,
  thread: PostCardThreadSkeleton,
};

export { CARD_COMPONENT_MAP, CARD_SKELETON_COMPONENT_MAP }; 