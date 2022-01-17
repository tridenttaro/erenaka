import {
  getDownloadURL,
  getMetadata,
  ref,
  deleteObject,
} from "@firebase/storage";
import ky from "ky";
import { storage } from ".";
import { UserState } from "../../types/auth";
import { BusinessCardData } from "../../types/other";
import uploadImage from "./uploadImage";

type Props = {
  downloadKey: string;
  userState: UserState;
  selectedGroupId: string;
};

const downloadFile = async (props: Props) => {
  if (!props.userState || !props.selectedGroupId || props.userState) return;

  const { downloadKey, userState, selectedGroupId } = props;
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
    const metadata = await getMetadata(imageRef);
    const trueFileName = metadata?.customMetadata?.trueFileName;
    fileName = trueFileName ? trueFileName : "";
    // 名刺データの取得
    const businessCardData: BusinessCardData = { company: "" };
    const company = metadata?.customMetadata?.company;
    businessCardData["company"] = company ? company : "";

    const image = new File([response], fileName, {
      type: "application/octet-stream",
    });

    await uploadImage({
      image,
      userState,
      businessCardData,
      groupId: selectedGroupId,
    });

    // // 取得した画像のダウンロード処理
    // const blobUrl = URL.createObjectURL(response);
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.download = fileName;
    // a.href = blobUrl;
    // a.click();
    // a.remove();
    // URL.revokeObjectURL(blobUrl);

    // 画像の削除
    // try {
    //   const deleteResponse = await deleteObject(imageRef);
    //   console.log("ファイルの削除完了");
    // } catch (error) {
    //   console.error("ファイルの削除失敗！", error);
    // }
  } catch (e) {
    window.alert("ファイルの取得に失敗しました。");
    console.error(e);
  }
};

export default downloadFile;
