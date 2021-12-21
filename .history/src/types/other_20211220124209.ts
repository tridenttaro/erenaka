export type ChangePageProps = {
  path: string;
  query?: { input: string };
};

export type ChangePage = {
  (props: ChangePageProps): void;
};

// グループの参加申請
export type RequestItem = {
  requestId: string;
  requestedUid: string;
  groupId: string;
  createdAt: Date;
};
