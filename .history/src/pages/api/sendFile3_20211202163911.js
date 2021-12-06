import middleware from "./../../middleware/middleware";
import nextConnect from "next-connect";

import * as FormData from "form-data";
import * as fs from "fs"; // 読み込む
import { Blob } from "buffer";
import axios from "axios";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  // console.log(req.body)
  // console.log(req.files)

  //...
  const url = req.query.weblink;

  // const files = req.files
  const file = req.files.file0[0];
  const fileName = file.originalFilename;
  const filePath = file.path;

  // console.log("file")
  // console.log(file)
  console.log("\n[fileName]");
  console.log(fileName);

  const image64 = fs.readFileSync(filePath, { encoding: "base64" });
  const imageBuffer = fs.readFileSync(filePath);
  const imageStream = fs.createReadStream(filePath);

  // console.log("\n\n[imageStream]")
  // console.log(imageStream)

  // const test = {test: "teststr"}
  // console.log(JSON.stringify(test))

  // bufferをArrayBufferにする
  function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }
  const arrayBuffer = toArrayBuffer(image64);
  // console.log(arrayBuffer)

  // ※node.js ではblob作成不可?
  // const blob = new Blob([arrayBuffer], {type: "application/octet-binary"});
  // const blob = new Blob([arrayBuffer], {type: "image/jpeg"});
  // const blob = new Blob([arrayBuffer]);
  // const blob = new Blob

  const formData = new FormData();
  // formData.append("file0", "test")

  formData.append(
    "files0",
    imageBuffer
    // formData.append('file0', imageStream,
    // fileName,
    // {
    //   filename: fileName,
    //   // contentType: 'image/jpeg',
    //   // contentType: 'application/octet-stream',
    //   // knownLength: imageBuffer.length
    // }
  );
  const formHeaders = formData.getHeaders();

  // formData.submit(url, function(err, res) {
  //   // console.log(res.statusCode);
  //   res.resume()
  // });

  // console.log("\n\n[formData]")
  // console.log(formData)

  const config = {
    headers: {
      ...formHeaders,
      // 'Content-Type': formHeaders["content-type"],
      // 'Content-Length': 0
    },
  };
  console.log(config);
  try {
    // const response = await axios.post(url, formData, config);
    // console.log("sendFile-OK")
    // console.log(response)
    // return res.json(response)
    // return res.json({status: "ok"})

    const response = await fetch(url, {
      method: "POST",
      body: formData,

      // header: {
      //   'Content-Type': 'application/json',
      //   // 'Content-Type': 'multipart/form-data',
      // },
      // body: test
    });
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.log("error!: " + err);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
