import middleware from './../../middleware/middleware'
import nextConnect from 'next-connect'

import FormData from 'form-data'
import * as fs from 'fs' // 読み込む
import { Blob } from 'buffer'
import axios from 'axios'


const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
  // console.log(req.body)
  // console.log(req.files)

  //...
  try{
    const url = req.query.weblink

    // const files = req.files
    const file = req.files.file0[0]
    const fileName = file.originalFilename
    const filePath = file.path

    // console.log("file")
    // console.log(file)
    console.log("fileName")
    console.log(fileName)

    const image64 =  fs.readFileSync(filePath, { encoding: "base64" })
    // const test = {test: "teststr"}
    // console.log(JSON.stringify(test))

    // const image =  fs.readFileSync(filePath)
    // const contentType = 'image/jpeg';

    // bufferをArrayBufferにする
    function toArrayBuffer(buffer) {
      var ab = new ArrayBuffer(buffer.length);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
      }
      return ab;
    }
    const arrayBuffer = toArrayBuffer(image64)
    // console.log(arrayBuffer)

    // const blob = new Blob([arrayBuffer], {type: "application/octet-binary"});
    // const blob = new Blob([arrayBuffer], {type: "image/jpeg"});
    // const blob = new Blob([arrayBuffer]);
    // const blob = new Blob
    
    
    const formData = new FormData();
    // formData.append("file0", "test")

    // formData.append('files[]', fs.readFileSync(filePath), 
    formData.append('files[]', fs.createReadStream(filePath), 
      // fileName,
      // {
      //   filename: fileName,
      //   // contentType: 'image/jpeg',
      //   // contentType: 'application/octet-stream',
      // }
    );

    // formData.submit(url, function(err, res) {
    //   console.log(res.statusCode);
    // });


    console.log("formData")
    console.log(formData)

    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: formData,
    //   // body: image64

    //   // header: { 
    //   //   'Content-Type': 'application/json',
    //   //   // 'Content-Type': 'multipart/form-data',
    //   // },
    //   // body: test
    // });

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders()
    });

    console.log("sendFile-OK")
    // console.log(response)
    return res.json(response)
    // return res.json({status: "ok"})
  } catch (err) {
    console.log("error!: " + err)
  }

  
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler