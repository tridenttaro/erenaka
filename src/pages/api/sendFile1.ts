// import { Formidable, formidable } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const url = req.query.weblink as string;
  const file: FormData = req.body;

  console.log("file")
  console.log(file)

  try {
    const response = await fetch(url,{
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: file
    })
    
    console.log("sendFile-OK")
    return res.json(response)
  } catch (err) {
    console.log("sendFile-error!: " + err)
  }
}
export default handler
