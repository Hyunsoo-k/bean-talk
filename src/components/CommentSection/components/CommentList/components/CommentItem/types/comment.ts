import type { Reply } from "@/types/reply";

type Comment = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  content: string;
  replies: Reply[];
  deletedHavingReply: boolean;
};

export type { Comment };