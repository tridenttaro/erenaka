import { listAll, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRef } from "react";
import { db, storage } from ".";
import { UserState } from "../../types/auth";
import { BusinessCardData } from "../../types/other";

type Props = {
  image?: File;
  // setImage?: (image: File | undefined) => void;
  groupId?: string;
  currentDirectory?: string[];
  updateImages?: () => void;
  setDownloadKey?: (str: string) => void;
  userState: UserState;
  // ローディング制御
  loading?: boolean;
  setLoading?: (bool: boolean) => void;

  // 会社のストレージへアップロード時
  businessCardData?: BusinessCardData;
  setBusinessCardData?: (data: BusinessCardData) => void;
};

const uploadImage = async (props: Props) => {
  if (!props.image) {
    alert("画像が選択されていません");
    return;
  }

  if (props.businessCardData) {
    const bc = props.businessCardData;
    if (
      bc.company == "" ||
      bc.username == "" ||
      bc.address == "" ||
      bc.telephoneNumber == "" ||
      bc.email == ""
    ) {
      alert("必須項目が入力されていません");
      return;
    }
  }

  if (props.loading != undefined && props.loading === true) {
    return;
  } else if (
    props.loading != undefined &&
    props.loading === false &&
    props.setLoading
  ) {
    props.setLoading(true);
  }

  const { image, groupId, currentDirectory, userState } = props;

  let storagePath = "temp";
  if (groupId) {
    storagePath = `groups/${props.groupId}`;

    if (currentDirectory && currentDirectory.length > 0) {
      storagePath += `/${currentDirectory.join("/")}`;
    }
  }

  // 元画像ベースにファイル名を変更して、新しく画像を作成する為の情報
  const trueFileName = image.name;
  const fileExtention = trueFileName.substring(
    trueFileName.lastIndexOf(".") + 1
  );
  const blob = image.slice(0, image.size, image.type);

  const storageFilesNames: string[] = [];
  const listRef = ref(storage, storagePath);

  try {
    const response = await listAll(listRef);
    response.items.forEach((itemRef) => {
      const uploadedFileName = itemRef.name.split(".")[0];
      storageFilesNames.push(uploadedFileName);
    });

    // 乱数6桁のファイル名生成
    const S = "0123456789";
    const N = 5;
    let newFileName = "";
    while (true) {
      newFileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      if (!storageFilesNames.includes(newFileName)) {
        break;
      }
    }
    // 元画像から名前を変更した、ファイルオブジェクトを作成
    const renamedFile = new File([blob], `${newFileName}.` + fileExtention, {
      type: image.type,
    });

    const storageRef = ref(storage, `${storagePath}/${newFileName}`);

    // メタデータに元のファイル名・名刺データを持たせる(名刺交換時)
    let metadata = {
      customMetadata: {
        trueFileName: trueFileName,
        // uploadedUid: userState.uid,
      },
    };
    if (props.businessCardData) {
      Object.assign(metadata.customMetadata, { ...props.businessCardData });
    }

    await uploadBytes(storageRef, renamedFile, metadata);

    // 入力情報の保存
    const userRef = doc(db, "users", userState.uid, "lastData", "lastData");
    await setDoc(userRef, { ...props.businessCardData });

    // firestoreに登録(会社のストレージへアップロード時)
    if (groupId) {
      const downloadUrl = await getDownloadURL(storageRef);

      let storeRef = doc(db, "groups", groupId, "images", newFileName);
      if (currentDirectory && currentDirectory.length > 0) {
        const cdStr: string[] = [];
        cdStr.push("directories");
        currentDirectory.forEach((dir, i) => {
          cdStr.push(dir);
          i < currentDirectory.length - 1 && cdStr.push("directories");
        });
        cdStr.push("images");

        storeRef = doc(db, "groups", groupId, ...cdStr, newFileName);
      }
      const timestamp = Timestamp.now();
      const imageData = {
        imageId: newFileName,
        createdAt: timestamp,
        fileName: trueFileName,
        uploadedUid: userState.uid,
        downloadUrl: downloadUrl,
        ...props.businessCardData,
      };

      await setDoc(storeRef, imageData);
    }

    // ダウンロードキーを設定(画像交換時)
    if (props.setDownloadKey) {
      props.setDownloadKey(newFileName);
    }
    // 画面を更新(画像交換時を"除く")
    if (props.updateImages) {
      props.updateImages();
    }
    // 入力欄を初期化
    if (props.setBusinessCardData) {
      props.setBusinessCardData({
        company: "",
        username: "",
        position: "",
        address: "",
        telephoneNumber: "",
        fax: "",
        email: "",
        others: "",
      });
    }

    if (props.businessCardData) {
      alert("グループへの画像のアップロードが完了しました。");
    } else {
      alert("画像のアップロードが完了しました");
    }

    if (props.setLoading) {
      props.setLoading(false);
    }
  } catch (error) {
    if (props.businessCardData) {
      alert("グループへのアップロードに失敗しました。");
    } else {
      alert("アップロードに失敗しました。");
    }

    if (props.setLoading) {
      props.setLoading(false);
    }
  }
};
export default uploadImage;
