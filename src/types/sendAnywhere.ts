export type DeviceData = {
  device_key: string;
  device_id: string; 
  profile_name: string;
}

export type UploadKeys = {
  created_time: number;
  expires_time: number;
  key: string;
  link: string;
  weblink: string;
}

// export type GetCreateKeyParams = {
//   name: string;
//   size: string;
//   device_key: string;
// }

export type StateAction<T> = (param: T) => void;

export type GetCreateKey = {
  (
    name: string,
    size: string,
    device_key: string,
    data: FormData,
    inputUploadKeys: StateAction<UploadKeys>,
    test?: File
  ): any
}

export type SendFile = {
  (
    weblink: string,
    image: FormData,
    test?: File,
  ): void
}

export type ReceiveFile = {
  (
    receiveKey: string,
    deviceKey: string,
  ): void
}