

import { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  key: string;
  device_id: string;
  mode: string;
  expires_time: number;
  weblink: string;
  file_size: number;
  file_count: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const device_key = req.query.device_key as string;
  const query = new URLSearchParams({device_key: device_key});
  const url = `${req.query.weblink as string}?${query}`;

  try {
    // 画像ダウンロード用URLの取得
    const response = await fetch(url)
    const data: Data = await response.json()

    console.log("data")
    console.log(data)
    
    const weblink = (data.weblink).includes("undefined") ? (data.weblink).replace("undefined", device_key) : data.weblink
    // const weblink = (data.weblink).replace("undefined", device_key);


    // 画像データの取得
    const response2 = await fetch(weblink)
    const blobData = await response2.blob();
    // const arrayBufferData = await response2.arrayBuffer()

    console.log("blob")
    console.log(blobData)

    // const fileName = (response2.headers.get("content-disposition"))?.split("\"")[1]
    // console.log("fileName: " + fileName)
    
    const arrayBufferData = await blobData.arrayBuffer()
    console.log("arrayBuffer")
    console.log(arrayBufferData)
    const bufferData = Buffer.from(arrayBufferData)
    // const blobText = bufferData.toString("base64");
      // const blobText = new Uint8Array(arrayBufferData)

      // const blobText = JSON.stringify(bufferData)
      // const prefix = `data:${arrayBufferData.headers['content-type']};base64,`;

      // const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
      //   let binary = '';
      //   const bytes = new Uint8Array(buffer);
      //   const len = bytes.byteLength;
      //   for (let i = 0; i < len; i++) {
      //     binary += String.fromCharCode(bytes[i]);
      //   }
      //   return window.btoa(binary);
      // }
      // // ArrayBuffer(4) => "/////w=="
      // const base64 = arrayBufferToBase64(bufferData);
    
    console.log("response2")
    console.log(response2)
    // console.log("arrayBuffer")
    // console.log(arrayBufferData)
    
    // console.log("bufferData")
    // console.log(bufferData)
    
    // const blobText = await blobData.text()
    // const fileData = {fileName: fileName, blob: blobText }
    // const fileData = {fileName: fileName, blob: bufferData}
    // const fileData = {fileName: fileName, blob: base64}

    // return res.json(data)
    console.log("receiveFile-OK")

    // return res.json(fileData)
    return res.send(bufferData)
    // return res.send(response2)
  } catch (err) {
    console.log("receiveFile-error!: " + err)
  }
}
export default handler