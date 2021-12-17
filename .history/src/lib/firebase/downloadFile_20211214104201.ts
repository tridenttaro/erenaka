import { getDownloadURL, getMetadata, ref } from "@firebase/storage";
import ky from "ky";
import { storage } from ".";

type Props = {
  downloadKey: string;
};

const downloadFile = async (props: Props) => {
  const { downloadKey } = props;
  if (downloadKey === "" || isNaN(parseInt(downloadKey, 10))) {
    return;
  } else {
    const keyNum = parseInt(downloadKey, 10);
    if (keyNum < 0 || keyNum > 99999) {
      return;
    }
  }
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
    window.alert("ファイルの取得に失敗しました。");
    console.error(e);
  }
};

export default downloadFile;
