

import axios from 'axios';
import ky from 'ky';
import { NextApiRequest, NextApiResponse } from 'next'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  // 仮(環境変数?)
  const apikey = "4f780319607060586c925c8d1e28b0cb5175fe4d";
  const params = {api_key: apikey, profile_name: "username"}

  const url = "https://send-anywhere.com/web/v1/device";


  try {
    const response = await axios.get(url,
      {
        params: {api_key: apikey, profile_name: "username"},
      }
    )

    return res.json(response.data)
  } catch (err) {
    console.log("error!: " + err)
  }
}
export default handler