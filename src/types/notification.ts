type Notification = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isChecked: boolean;
  targetTitle: string;
  targetUrl: string;
  triggeredBy: {
    _id: string;
    nickname: string;
  };
  type: "댓글" | "답글";
};

export type { Notification };