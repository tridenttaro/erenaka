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
  imageId: string;
  createdAt: string;
  fileName: string;
  uploadedUid: string;
  downloadUrl: string;
} & BusinessCardData;

export type BusinessCardData = {
  company: string; // 社名
  employee?: string; // 社員名(名刺記載氏名)
  department?: string; // 部署名
  position?: string; // 役職名
  address?: string; // 住所
  telephoneNumber?: string; // 電話番号
  others?: string; // その他
};
