import { getDownloadURL, getMetadata, ref } from "@firebase/storage";
import ky from "ky";
import { storage } from ".";

type Props = {
  downloadKey: string;
};

const downloadFile = async (props: Props) => {
  const { downloadKey: downloadKey } = props;
  const imageRef = ref(storage, `temp/${downloadKey}`);
  let fileName = "";

  try {
    const url = await getDownloadURL(imageRef);
    const response = await ky.get(url).blob();

    // メタデータから元のファイル名を取得
    try {
      const metadata = await getMetadata(imageRef);
      const trueFileName = metadata?.customMetadata?.trueFileName;
      fileName = trueFileName ? trueFileName : "";
    } catch (error) {
      console.error(error);
    }

    const url2 = URL.createObjectURL(response);
    // const url2 = url;
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = fileName;
    a.href = url2;
    a.click();
    a.remove();
    URL.revokeObjectURL(url2);
  } catch (e) {
    console.log("ファイルの取得失敗");
    console.error(e);
  }
};

export default downloadFile;
