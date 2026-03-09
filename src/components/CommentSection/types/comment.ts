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

type Reply = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  },
  content: string;
};

export type { Comment, Reply };