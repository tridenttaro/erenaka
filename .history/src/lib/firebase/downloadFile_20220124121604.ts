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
  // ローディング制御
  loading?: boolean;
  setLoading?: (bool: boolean) => void;
};

const downloadFile = async (props: Props) => {
  if (!props.userState || !props.selectedGroupId || !props.downloadKey) {
    alert("ダウンロードキー、保存先グループを選択してください");
    return;
  }

  if (props.loading !== undefined && props.loading === true) {
    console.log("連続送信をブロック");
    return;
  } else if (
    props.loading !== undefined &&
    props.loading === false &&
    props.setLoading
  ) {
    props.setLoading(true);
  }

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

    if (selectedGroupId !== "download") {
      // 名刺データの取得
      const businessCardData: BusinessCardData = {
        company: "",
        username: "",
        position: "",
        address: "",
        telephoneNumber: "",
        email: "",
        fax: "",
        others: "",
      };
      const company = metadata?.customMetadata?.company;
      const username = metadata?.customMetadata?.username;
      const positon = metadata?.customMetadata?.position;
      const address = metadata?.customMetadata?.address;
      const telephoneNumber = metadata?.customMetadata?.telephoneNumber;
      const email = metadata?.customMetadata?.email;
      const fax = metadata?.customMetadata?.fax;
      const others = metadata?.customMetadata?.others;
      company && (businessCardData.company = company);
      username && (businessCardData.username = username);
      positon && (businessCardData.position = positon);
      address && (businessCardData.address = address);
      telephoneNumber && (businessCardData.telephoneNumber = telephoneNumber);
      email && (businessCardData.email = email);
      fax && (businessCardData.fax = fax);
      others && (businessCardData.others = others);

      const image = new File([response], fileName, {
        type: "application/octet-stream",
      });

      await uploadImage({
        image,
        userState,
        businessCardData,
        groupId: selectedGroupId,
      });
      // ダウンロードを選択
    } else {
    }

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
    const deleteResponse = await deleteObject(imageRef);

    if (props.setLoading) {
      props.setLoading(false);
    }
  } catch (e) {
    alert("ファイルの取得に失敗しました。");

    if (props.setLoading) {
      props.setLoading(false);
    }
  }
};

export default downloadFile;
