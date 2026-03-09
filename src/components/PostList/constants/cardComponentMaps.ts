import {
  PostCardBackground,
  PostCardColumn,
  PostCardJob,
  PostCardRow,
  PostCardThread
} from "@/components/postCards";
import {
  PostCardBackgroundSkeleton,
  PostCardColumnSkeleton,
  PostCardThreadSkeleton,
  PostCardRowSkeleton,
  PostCardJobSkeleton
} from "@/components/postCardSkeletons"

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