import { getDownloadURL, ref } from "@firebase/storage";
import ky from "ky";
import { storage } from ".";

type Props = {
  receiveKey: string;
};

const downloadFile = async (props: Props) => {
  const { receiveKey } = props;
  const pathReference = ref(storage, `temp/${receiveKey}`);
  // getDownloadURL(pathReference)
  //   .then((url) => {

  //   })
  try {
    const url = await getDownloadURL(pathReference);
    const response = await ky.get(url).blob();

    // Blobデータから、それを表示可能なURLを生成する.
    const blobUrl = (window.URL || window.webkitURL).createObjectURL(response);

    // ダウンロード.
    const a = document.createElement("a");
    a.href = blobUrl; // ダウンロード先URLに指定.
    a.download = ""; // ダウンロードを指定.
    // a.download = ""
    document.body.appendChild(a); // aタグ要素を画面に一時的に追加する（これをしないとFirefoxで動作しない）.
    a.click(); // クリックすることでダウンロードを開始.
    document.body.removeChild(a); // 不要になったら削除.
  } catch (e) {}
};

export default downloadFile;
