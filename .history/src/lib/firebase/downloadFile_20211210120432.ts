import { getDownloadURL, getMetadata, ref } from "@firebase/storage";
import ky from "ky";
import { storage } from ".";

type Props = {
  downloadKey: string;
};

const downloadFile = async (props: Props) => {
  const { downloadKey: downloadKey } = props;
  const imageRef = ref(storage, `temp/${downloadKey}`);

  try {
    const url = await getDownloadURL(imageRef);
    const response = await ky.get(url).blob();

    try {
      const metadata = await getMetadata(imageRef);
      console.log(metadata);
    } catch (error) {
      console.error(error);
    }

    // const url2 = URL.createObjectURL(response);
    // // const url2 = url;
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.download = "";
    // a.href = url2;
    // a.click();
    // a.remove();
    // URL.revokeObjectURL(url2);

    // // Blobデータから、それを表示可能なURLを生成する.
    // const blobUrl = (window.URL || window.webkitURL).createObjectURL(response);
    // // ダウンロード.
    // const a = document.createElement("a");
    // a.href = blobUrl; // ダウンロード先URLに指定.
    // a.download = ""; // ダウンロードを指定.
    // // a.download = ""
    // document.body.appendChild(a); // aタグ要素を画面に一時的に追加する（これをしないとFirefoxで動作しない）.
    // a.click(); // クリックすることでダウンロードを開始.
    // document.body.removeChild(a); // 不要になったら削除.
  } catch (e) {}
};

export default downloadFile;
