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

// グループ内のディレクトリ全て
type AllDirectoryData = {
  createdAt: string;
  directoryName: string;
  createdUid: string;
  updatedAt: string;
  directories?: AllDirectoryData[];
};

export type ImageData = {
  imageId: string;
  createdAt: string;
  fileName: string;
  uploadedUid: string;
  downloadUrl: string;
} & BusinessCardData;

export type BusinessCardData = {
  company: string; // 社名
  username: string; // 名刺差出人氏名
  position?: string; // 役職名
  address: string; // 住所
  telephoneNumber: string; // 電話番号
  email: string;
  fax?: string;
  others?: string; // その他
};
