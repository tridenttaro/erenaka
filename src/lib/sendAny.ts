import axios from "axios";
import ky from "ky";
import fs from "fs";
import { DeviceData,  UploadKeys, StateAction, ReceiveFile, SendFile, GetCreateKey } from "../../types/sendAnywhere";
import { O_TRUNC } from "constants";

export const getCreateKey: GetCreateKey = async (name, size, device_key, data, inputUploadKeys, test) => {
  const url = "/api/getCreateKey"

  const params = {name: name, size: size, device_key: device_key}
  try {
    // PWA化を考え、axios(httpxml)でなくky(fetch)を利用
    const response: UploadKeys = await ky.get(url, {
      searchParams: params,
    }).json()
    
    console.log("getCreatKey-OK")
    inputUploadKeys(response)

    const weblink = response.weblink;
    sendFile(weblink, data, test)
  } catch (error) {
    console.log("getCreatKey-error!: " + error);
    return;
  }
};


export const updateDevice = async (setDeviceData: StateAction<DeviceData>) => {
  const url = "/api/updateDevice"
  try {
    const response:DeviceData = await ky.get(url).json();

    console.log("updateDevice-OK")
    setDeviceData(response)
  } catch (error) {
    console.log("updateDevice-error!: " + error);
    return;
  }
};


export const sendFile: SendFile = async (weblink, image, test) => {
  const url = "/api/sendFile3"

  try {
    // console.log("url: " + url)
    // console.log("data:" + data)

    // const bodyData = {
    //   weblink: weblink,
    //   data: image
    // }

    // const response = await fetch(fetchUrl, {
    //   method: 'POST',
    //   // headers: {
    //   //   'Content-Type': 'application/json'
    //   // },
    //   // body: JSON.stringify(bodyData)
      
    //   body: image
    // });

    const response = await ky.post(url,{
      searchParams: {weblink: weblink},
      body: image,
    })

    console.log("sendFile-OK")
    console.log(response)
  } catch (error) {
    console.log("sendFile-error!: " + error);
  }
};

export const receiveFile: ReceiveFile = async (receiveKey, deviceKey) => {
  const url = "/api/receiveFile"
  const weblink = `https://send-anywhere.com/web/v1/key/${receiveKey}`;

  try {
    const response:any = await ky.get(url,{
      searchParams: {
        weblink: weblink,
        device_key: deviceKey,
      },
    // })
    }).blob();
    // }).arrayBuffer()
    // }).json()
    console.log("response")
    console.log(response)

    // const fileName = response.fileName;
    // const fileName = (response.headers.get("content-disposition"))?.split("\"")[1]
  
    // const arrayBuffer = await JSON.parse(response.blob)

    // const base64ToArrayBuffer = (base64: string) => {
    //   const binary_string = window.atob(base64);
    //   const len = binary_string.length;
    //   let bytes = new Uint8Array(len);
    //   for (let i = 0; i < len; i++) {
    //     bytes[i] = binary_string.charCodeAt(i);
    //   }
    //   return bytes.buffer;
    // }
    // // "/////w==" => ArrayBuffer(4)
    // const arrayBuffer = base64ToArrayBuffer(parseJson);

    // const blobData = new Blob([response.blob], {type: 'application/octet-stream'})
    // const blobData = new Blob([arrayBuffer], {type: 'image/jpeg'})
    // const blobData = new Blob([arrayBuffer])

    // console.log("reiveFile-OK");
    // console.log("blobData")
    // console.log(blobData)
    // console.log("blobData-size: " + blobData.size)


    // Blobデータから、それを表示可能なURLを生成する.
    const blobUrl = (window.URL || window.webkitURL).createObjectURL(response)
    // const blobUrl = (window.URL || window.webkitURL).createObjectURL(blobData)

    // ダウンロード.
    const a = document.createElement('a')
    a.href = blobUrl                // ダウンロード先URLに指定.
    // a.download = fileName        // ダウンロードファイル名を指定.
    a.download = "test.jpg"              // ダウンロードを指定.
    // a.download = ""
    document.body.appendChild(a) // aタグ要素を画面に一時的に追加する（これをしないとFirefoxで動作しない）.
    a.click()                    // クリックすることでダウンロードを開始.
    document.body.removeChild(a) // 不要になったら削除.

  } catch (error) {
    console.log("reiveFile-error!: " + error);
  }
};


