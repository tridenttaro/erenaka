export type ChangePageProps = {
  path: string;
  query?: { input: string };
};

export type ChangePage = {
  (props: ChangePageProps): void;
};

// グループの参加申請
export type RequestsList = {
  requestedUid: string;
  groupId: string;
  createdAt: Date;
}[];
