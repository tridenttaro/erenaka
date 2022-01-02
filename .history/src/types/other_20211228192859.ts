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
  requestedUsername: string;
  groupId: string;
  groupName: string;
  createdAt: string;
};

export type GroupData = {
  createdAt: string;
  createdUid: string;
  groupId: string;
  groupName: string;
  updatedAt: string;
};

export type DirectoryData = {
  createdAt: string;
  directoryName: string;
  createdUid: string;
  updatedAt: string;
};

export type ImageData = {
  createdAt: string;
  fileName: string;
  uploadedUid: string;
  downloadUrl: string;
};
