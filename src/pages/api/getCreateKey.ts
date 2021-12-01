

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
import { GetCreateKeyParams } from '../../../types/sendAnywhere';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 // console.log(response.data.url); 
 // console.log(response.data.explanation); 

  const name = req.query.name as string;
  const size = req.query.size as string;
  const device_key = req.query.device_key as string;

  const params: GetCreateKeyParams = {name: name, size: size, device_key: device_key}
  
  const url = 'https://send-anywhere.com/web/v1/key'

  try {
    const response = await axios.get(url,
      {
        params: params
      }
    )
    console.log("createKey-response: " + response.data.weblink)
    return res.json(response.data)
  } catch (err) {
    console.log("getCreateKey-error!: " + err)
  }
}
export default handler