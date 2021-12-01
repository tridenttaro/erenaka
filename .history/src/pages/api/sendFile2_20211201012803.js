

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // }

// const handler = async (req, res) => {
//   try {
//     const url = req.query.weblink
//     // console.log("body")
//     // console.log(req.body)

    
//     const data = req.body
    
//     console.log("url")
//     console.log(url)
//     console.log("req-body")
//     console.log(req.body)
//     console.log("data-type")
//     console.log(typeof data)


//     const response = await fetch(url, {
//       method: 'POST',
//       body: data,
//     });

//     // const response = await fetch(url,{
//     //   method: "POST",
//     //   // headers: {
//     //   //   'Content-Type': 'multipart/form-data',
//     //   // },
//     //   body: file
//     // })

  
    
//     console.log("sendFile-OK")
//     return res.json(response)
//   } catch (err) {
//     console.log("sendFile-error!: " + err)
//   }
// }
// export default handler





const micro = require('micro');
const formidable = require('formidable');

async function endpoint(req, res) {
  
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}
  
export const config = {
  api: {
    bodyParser: false,
  },
};
export default micro(endpoint);